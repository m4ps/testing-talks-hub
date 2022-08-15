import { World, IWorldOptions } from "@cucumber/cucumber";
import playwright, {
  BrowserContextOptions,
  Page,
  Browser,
  BrowserContext,
  BrowserType,
} from "@playwright/test";

export type Screen = {
	browser: Browser;
	context: BrowserContext;
	page: Page;
}

export class ScenarioWorld extends World {
	constructor(options: IWorldOptions) {
		super(options);
	}

	screen!: Screen;

	async init(contextOptions: BrowserContextOptions): Promise<Screen> {
		await this.screen?.page.close();
		await this.screen?.context.close()
		await this.screen?.browser.close();

		const browser = await this.newBrowser();
		const context = await browser.newContext();
		const page = await context.newPage();

		this.screen = { browser, context, page };

		return this.screen;
	}

	private newBrowser = async () => {}
}
