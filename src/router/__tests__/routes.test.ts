import { describe, it, expect } from "vitest";
import router from "../index";

describe("router", () => {
  it("contient les routes principales", () => {
    const routes = router.getRoutes();

    expect(routes.length).toBeGreaterThan(0);

    const paths = routes.map((r) => r.path);

    expect(paths).toContain("/");
    expect(paths).toContain("/game");
    expect(paths).toContain("/leaderboard");
  });
});
