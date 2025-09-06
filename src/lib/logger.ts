interface LogEvent {
  timestamp: string;
  level: 'info' | 'warn' | 'error';
  message: string;
  data?: any;
  userId?: string;
  sessionId?: string;
}

class Logger {
  private logs: LogEvent[] = [];
  private maxLogs = 1000;

  private createLogEvent(
    level: LogEvent['level'], 
    message: string, 
    data?: any,
    userId?: string,
    sessionId?: string
  ): LogEvent {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      data,
      userId,
      sessionId,
    };
  }

  info(message: string, data?: any, userId?: string, sessionId?: string) {
    const logEvent = this.createLogEvent('info', message, data, userId, sessionId);
    this.logs.push(logEvent);
    this.cleanup();
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`[INFO] ${message}`, data || '');
    }
  }

  warn(message: string, data?: any, userId?: string, sessionId?: string) {
    const logEvent = this.createLogEvent('warn', message, data, userId, sessionId);
    this.logs.push(logEvent);
    this.cleanup();
    
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[WARN] ${message}`, data || '');
    }
  }

  error(message: string, data?: any, userId?: string, sessionId?: string) {
    const logEvent = this.createLogEvent('error', message, data, userId, sessionId);
    this.logs.push(logEvent);
    this.cleanup();
    
    console.error(`[ERROR] ${message}`, data || '');
  }

  private cleanup() {
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }
  }

  getLogs(level?: LogEvent['level'], limit: number = 100): LogEvent[] {
    let filteredLogs = level 
      ? this.logs.filter(log => log.level === level)
      : this.logs;
    
    return filteredLogs.slice(-limit);
  }

  clearLogs() {
    this.logs = [];
  }

  // Performance monitoring
  timeStart(label: string, userId?: string, sessionId?: string) {
    const startTime = performance.now();
    this.info(`Timer started: ${label}`, { startTime }, userId, sessionId);
    return startTime;
  }

  timeEnd(label: string, startTime: number, userId?: string, sessionId?: string) {
    const endTime = performance.now();
    const duration = endTime - startTime;
    this.info(`Timer ended: ${label}`, { 
      startTime, 
      endTime, 
      duration: `${duration.toFixed(2)}ms` 
    }, userId, sessionId);
    return duration;
  }

  // Usage analytics
  trackPageView(page: string, userId?: string, sessionId?: string) {
    this.info('Page view', { page }, userId, sessionId);
  }

  trackUserAction(action: string, details?: any, userId?: string, sessionId?: string) {
    this.info('User action', { action, ...details }, userId, sessionId);
  }

  trackError(error: Error, context?: string, userId?: string, sessionId?: string) {
    this.error('Application error', {
      name: error.name,
      message: error.message,
      stack: error.stack,
      context,
    }, userId, sessionId);
  }

  // Performance metrics
  trackPerformanceMetric(metric: string, value: number, unit: string = 'ms', userId?: string, sessionId?: string) {
    this.info('Performance metric', {
      metric,
      value,
      unit,
    }, userId, sessionId);
  }
}

export const logger = new Logger();

// Performance observer for Core Web Vitals
if (typeof window !== 'undefined') {
  // LCP (Largest Contentful Paint)
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === 'largest-contentful-paint') {
        logger.trackPerformanceMetric('LCP', entry.startTime);
      }
    }
  });

  try {
    observer.observe({ type: 'largest-contentful-paint', buffered: true });
  } catch (e) {
    // Browser doesn't support this metric
  }

  // FID (First Input Delay)
  const fidObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === 'first-input') {
        const fidEntry = entry as PerformanceEventTiming;
        logger.trackPerformanceMetric('FID', fidEntry.processingStart - fidEntry.startTime);
      }
    }
  });

  try {
    fidObserver.observe({ type: 'first-input', buffered: true });
  } catch (e) {
    // Browser doesn't support this metric
  }
}