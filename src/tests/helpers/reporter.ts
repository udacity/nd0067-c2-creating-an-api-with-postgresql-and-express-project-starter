import { DisplayProcessor, SpecReporter, StacktraceOption } from "jasmine-spec-reporter";
import SuiteInfo = jasmine.SuiteInfo;

class CustomProcessor extends DisplayProcessor {
	public displayJasmineStarted(info: SuiteInfo, log: string): string {
		return `TypeScript ${log}`;
	}
}

const specReporter = new SpecReporter({
	spec: {
		displayStacktrace: StacktraceOption.NONE,
	},
	customProcessors: [CustomProcessor],
});

jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(specReporter);
