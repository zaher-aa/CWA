import { trace } from '@opentelemetry/api';

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { NodeSDK } = await import('@opentelemetry/sdk-node');
    const { Resource } = await import('@opentelemetry/resources');
    const { ConsoleSpanExporter } = await import('@opentelemetry/sdk-trace-base');
    const { getNodeAutoInstrumentations } = await import('@opentelemetry/auto-instrumentations-node');

    const sdk = new NodeSDK({
      resource: new Resource({
        'service.name': 'tab-generator-app',
        'service.version': '1.0.0',
      }),
      traceExporter: new ConsoleSpanExporter(),
      instrumentations: [getNodeAutoInstrumentations()],
    });

    sdk.start();
  }
}

// Custom tracing utilities
export const tracer = trace.getTracer('tab-generator', '1.0.0');

export function createSpan(name: string) {
  return tracer.startSpan(name);
}

export function addEvent(span: any, name: string, attributes?: Record<string, any>) {
  span.addEvent(name, attributes);
}

export function setSpanStatus(span: any, success: boolean, message?: string) {
  span.setStatus({
    code: success ? 1 : 2, // OK = 1, ERROR = 2
    message,
  });
}