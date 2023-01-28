import {
  DisplayProcessor,
  SpecReporter,
  StacktraceOption,
} from 'jasmine-spec-reporter'
import SuiteInfo = jasmine.SuiteInfo
import CustomReporter = jasmine.CustomReporter;

class CustomProcessor extends DisplayProcessor {
  public displayJasmineStarted (info: SuiteInfo, log: string): string {
    return `${log}`
  }
}

jasmine.getEnv().clearReporters()
jasmine.getEnv().addReporter(
  (new SpecReporter({
    spec: {
      displayStacktrace: StacktraceOption.NONE
    },
    customProcessors: [CustomProcessor]
  }) as unknown as CustomReporter)
)
