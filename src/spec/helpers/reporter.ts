
import {
  DisplayProcessor,
  SpecReporter,
  StacktraceOption,
} from 'jasmine-spec-reporter'

class CustomProcessor extends DisplayProcessor {
  public displayJasmineStarted(_: jasmine.SuiteInfo, log: string): string {
      return `${log}`
  }
}
jasmine.getEnv().clearReporters()
jasmine.getEnv().addReporter(
  new SpecReporter({
      spec: {
          displayStacktrace: StacktraceOption.NONE,
      },
      customProcessors: [CustomProcessor],
  })
)
