import { describe, it, expect, vi, beforeEach } from "vitest";
import { useGame } from "../gameScript";

describe("useGame", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  function setupPlayer(game: ReturnType<typeof useGame>) {
    const team = [
      { id: 1, name: "A", hp: 100, maxHp: 100 },
      { id: 2, name: "B", hp: 100, maxHp: 100 },
    ];

    game.setPlayer("Test", team);

    return { team, player: game.player };
  }

  it("initialise le joueur", () => {
    const game = useGame();

    const team = [{ id: 1, name: "A", hp: 100, maxHp: 100 }];
    game.setPlayer("Ash", team);

    expect(game.player.value?.name).toBe("Ash");
    expect(game.player.value?.activePokemon).toEqual(team[0]);
    expect(game.player.value?.score).toBe(0);
  });

  it("ajoute maxHp aux trainers", () => {
    const game = useGame();

    game.setTrainers([
      {
        name: "Trainer",
        experience: 2,
        reward: 10,
        pokemon: { hp: 50 },
      },
    ]);

    expect(game.currentTrainer.value.pokemon.maxHp).toBe(50);
  });

  it("passe au combat suivant", () => {
    const game = useGame();

    game.nextBattle();

    expect(game.currentBattle.value).toBe(2);
  });

  it("ne dépasse pas le max de combats", () => {
    const game = useGame();

    game.currentBattle.value = game.totalBattles;
    game.nextBattle();

    expect(game.currentBattle.value).toBe(game.totalBattles);
  });

  it("change de pokemon", () => {
    const game = useGame();
    const { team, player } = setupPlayer(game);

    game.switchPokemon(team[1]);

    expect(player.value?.activePokemon).toEqual(team[1]);
  });

  it("ne change pas si pokemon KO", () => {
    const game = useGame();
    const { team, player } = setupPlayer(game);

    team[1].hp = 0;
    game.switchPokemon(team[1]);

    expect(player.value?.activePokemon).toEqual(team[0]);
  });

  it("ne change pas deux fois", () => {
    const game = useGame();
    const { team, player } = setupPlayer(game);

    game.switchPokemon(team[1]);
    game.switchPokemon(team[0]);

    expect(player.value?.activePokemon).toEqual(team[1]);
  });

  it("détecte tous les pokemons KO", () => {
    const game = useGame();
    const { team } = setupPlayer(game);

    team.forEach((p) => (p.hp = 0));

    expect(game.checkIfAllPokemonKO()).toBe(true);
  });

  it("détecte pokemon encore vivant", () => {
    const game = useGame();
    const { team } = setupPlayer(game);

    team[0].hp = 10;

    expect(game.checkIfAllPokemonKO()).toBe(false);
  });

  it("playTurn ne crash pas sans joueur", () => {
    const game = useGame();

    expect(() => game.playTurn()).not.toThrow();
  });

  it("gagne un combat", () => {
    const game = useGame();

    game.setPlayer("Test", [{ id: 1, name: "A", hp: 100, maxHp: 100 }]);

    game.setTrainers([
      {
        name: "Enemy",
        experience: 1,
        reward: 50,
        pokemon: { hp: 1, maxHp: 100 }, // ✅ IMPORTANT
      },
    ]);

    vi.spyOn(Math, "random").mockReturnValue(0);

    game.playTurn();

    expect(game.player.value?.score).toBe(50);
  });

  it("soigne un pokemon", () => {
    const game = useGame();
    const { team } = setupPlayer(game);

    game.player.value!.score = 1000;
    team[0].hp = 50;

    game.healActivePokemon(50);

    expect(team[0].hp).toBeGreaterThan(50);
  });

  it("bloque soin si pas assez de points", () => {
    const game = useGame();
    const { team } = setupPlayer(game);

    game.player.value!.score = 0;
    team[0].hp = 50;

    game.healActivePokemon(50);

    expect(game.chatMessages.value).toContain(
      "Pas assez de points pour soigner !",
    );
  });

  it("ne soigne pas si full HP", () => {
    const game = useGame();
    const { team } = setupPlayer(game);

    const hp = team[0].hp;

    game.healActivePokemon(50);

    expect(team[0].hp).toBe(hp);
  });

  it("appelle fetch leaderboard", async () => {
    const game = useGame();
    setupPlayer(game);

    game.player.value!.score = 100;

    globalThis.fetch = vi.fn(() =>
      Promise.resolve({ json: () => Promise.resolve({}) }),
    ) as any;

    await game.pushToLeaderboard();

    expect(globalThis.fetch).toHaveBeenCalled();
  });

  it("auto switch quand KO", () => {
    const game = useGame();

    game.setPlayer("Test", [
      { id: 1, name: "A", hp: 1, maxHp: 100 },
      { id: 2, name: "B", hp: 100, maxHp: 100 },
    ]);

    game.setTrainers([
      {
        name: "Enemy",
        experience: 4,
        reward: 10,
        pokemon: { hp: 100 },
      },
    ]);

    vi.spyOn(Math, "random").mockReturnValue(0);

    game.playTurn();

    expect(game.player.value?.activePokemon.name).toBe("B");
  });

  it("game over si tous KO", () => {
    const game = useGame();

    game.setPlayer("Test", [{ id: 1, name: "A", hp: 1, maxHp: 100 }]);

    game.setTrainers([
      {
        name: "Enemy",
        experience: 4,
        reward: 10,
        pokemon: { hp: 100 },
      },
    ]);

    vi.spyOn(Math, "random").mockReturnValue(0);

    game.playTurn();

    expect(game.chatMessages.value).toContain("Game Over! Vous avez perdu.");
  });

  it("attaque peut rater", () => {
    const game = useGame();

    game.setPlayer("Test", [{ id: 1, name: "A", hp: 100, maxHp: 100 }]);

    game.setTrainers([
      {
        name: "Enemy",
        experience: 1,
        reward: 10,
        pokemon: { hp: 100 },
      },
    ]);

    vi.spyOn(Math, "random").mockReturnValue(1);

    expect(() => game.playTurn()).not.toThrow();
  });

  it("ennemi attaque le joueur", () => {
    const game = useGame();

    game.setPlayer("Test", [{ id: 1, name: "A", hp: 100, maxHp: 100 }]);

    game.setTrainers([
      {
        name: "Enemy",
        experience: 4,
        reward: 10,
        pokemon: { hp: 100 },
      },
    ]);

    vi.spyOn(Math, "random").mockReturnValue(0);

    const hp = game.player.value!.activePokemon.hp;

    game.playTurn();

    expect(game.player.value!.activePokemon.hp).toBeLessThanOrEqual(hp);
  });
});
