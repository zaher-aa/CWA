"use client";

import { useState, useEffect, useRef } from "react";
import { logger } from "@/lib/logger";

interface Message {
  id: string;
  sender: 'boss' | 'family' | 'agile';
  text: string;
  task: string;
  urgent?: boolean;
  timestamp: number;
  dismissed?: boolean;
}

interface CodeIssue {
  id: string;
  type: 'accessibility' | 'security' | 'functionality';
  description: string;
  code: string;
  solution: string;
  fixed: boolean;
  violation: string;
}

export default function CourtRoomPage() {
  const [gameStarted, setGameStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes default
  const [customTime, setCustomTime] = useState(5);
  const [messages, setMessages] = useState<Message[]>([]);
  const [codeIssues, setCodeIssues] = useState<CodeIssue[]>([]);
  const [currentStage, setCurrentStage] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [courtCase, setCourtCase] = useState<string | null>(null);
  const [selectedCode, setSelectedCode] = useState("");
  
  const messageTimeouts = useRef<NodeJS.Timeout[]>([]);

  const initialCodeIssues: CodeIssue[] = [
    {
      id: "1",
      type: "accessibility",
      description: "Missing alt attribute on image",
      code: `<img src="logo.png" />`,
      solution: `<img src="logo.png" alt="Company logo" />`,
      fixed: false,
      violation: "Disability Discrimination Act"
    },
    {
      id: "2", 
      type: "security",
      description: "Input validation missing",
      code: `<input type="text" onChange={e => setUser(e.target.value)} />`,
      solution: `<input type="text" onChange={e => {
  const sanitized = e.target.value.replace(/<script.*?>.*?<\\/script>/gi, '');
  if (sanitized.length <= 50) setUser(sanitized);
}} />`,
      fixed: false,
      violation: "Data Protection Laws"
    },
    {
      id: "3",
      type: "functionality", 
      description: "User login system broken",
      code: `function login() { /* TODO: implement */ }`,
      solution: `function login(credentials) {
  if (!credentials.username || !credentials.password) {
    throw new Error('Missing credentials');
  }
  return authenticateUser(credentials);
}`,
      fixed: false,
      violation: "Contract Law - Service Unavailable"
    }
  ];

  const messageTemplates = {
    boss: [
      "Are you done with sprint 1?",
      "The client is asking for an update",
      "We need to deliver this by EOD",
      "Can you send me the progress report?",
      "The stakeholders want a demo tomorrow"
    ],
    family: [
      "Can you pick up the kids after work?",
      "Don't forget dinner with parents tonight",
      "Your mom called, please call her back",
      "Can you help with homework later?",
      "Remember the school meeting at 6pm"
    ],
    agile: [
      "Fix change Title colour to Red",
      "Update the navigation menu layout", 
      "Add more spacing between components",
      "Change button size to large",
      "Update footer copyright year"
    ]
  };

  useEffect(() => {
    if (gameStarted && !gameOver) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setGameOver(true);
            checkWinCondition();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [gameStarted, gameOver]);

  useEffect(() => {
    if (gameStarted && !gameOver) {
      scheduleMessages();
    }
    
    return () => {
      messageTimeouts.current.forEach(timeout => clearTimeout(timeout));
    };
  }, [gameStarted, gameOver]);

  const scheduleMessages = () => {
    const scheduleMessage = (delay: number, sender: keyof typeof messageTemplates, task?: string) => {
      const timeout = setTimeout(() => {
        if (!gameOver) {
          const templates = messageTemplates[sender];
          const text = templates[Math.floor(Math.random() * templates.length)];
          
          const message: Message = {
            id: Date.now().toString(),
            sender,
            text,
            task: task || text,
            timestamp: Date.now()
          };
          
          setMessages(prev => [...prev, message]);
          
          if (task) {
            setTimeout(() => {
              if (!gameOver) {
                const urgentMessage: Message = {
                  id: (Date.now() + 1).toString(),
                  sender,
                  text: `URGENT: ${text}`,
                  task,
                  urgent: true,
                  timestamp: Date.now()
                };
                setMessages(prev => [...prev, urgentMessage]);
                
                setTimeout(() => {
                  if (!gameOver) {
                    triggerCourtCase(task);
                  }
                }, 120000); // 2 more minutes
              }
            }, 120000); // 2 minutes
          }
        }
      }, delay);
      
      messageTimeouts.current.push(timeout);
    };

    scheduleMessage(20000, 'boss');
    scheduleMessage(30000, 'family'); 
    scheduleMessage(40000, 'agile', 'fix alt in img1');
    scheduleMessage(60000, 'boss');
    scheduleMessage(80000, 'agile', 'fix input validation');
    scheduleMessage(100000, 'family');
    scheduleMessage(120000, 'agile', 'Fix User login');
  };

  const triggerCourtCase = (task: string) => {
    let caseType = '';
    if (task.includes('alt')) {
      setCourtCase("You are being sued for breaking the Disability Discrimination Act - Missing alt attributes make your website inaccessible!");
      caseType = 'accessibility_violation';
    } else if (task.includes('validation')) {
      setCourtCase("You are being sued under Data Protection Laws - Your application was hacked due to lack of input validation!");
      caseType = 'security_violation';
    } else if (task.includes('login')) {
      setCourtCase("Your company has been declared bankrupt - Users cannot access your application and you're not getting paid!");
      caseType = 'functionality_violation';
    }
    
    logger.trackUserAction('court_case_triggered', {
      task,
      caseType,
      timeRemaining,
      issuesFixed: codeIssues.filter(i => i.fixed).length,
      totalIssues: codeIssues.length
    });
    
    setGameOver(true);
  };

  const startGame = () => {
    const sessionId = Date.now().toString();
    logger.trackUserAction('court_room_game_started', { 
      timeLimit: customTime,
      sessionId 
    });
    
    setGameStarted(true);
    setTimeRemaining(customTime * 60);
    setCodeIssues(initialCodeIssues);
    setMessages([]);
    setGameOver(false);
    setCourtCase(null);
    setCurrentStage(1);
    messageTimeouts.current = [];
  };

  const resetGame = () => {
    setGameStarted(false);
    setTimeRemaining(300);
    setMessages([]);
    setCodeIssues([]);
    setGameOver(false);
    setCourtCase(null);
    setCurrentStage(1);
    messageTimeouts.current.forEach(timeout => clearTimeout(timeout));
    messageTimeouts.current = [];
  };

  const fixIssue = (issueId: string) => {
    const issue = codeIssues.find(i => i.id === issueId);
    if (issue) {
      logger.trackUserAction('code_issue_fixed', {
        issueId,
        issueType: issue.type,
        description: issue.description,
        timeRemaining
      });
    }
    
    setCodeIssues(prev => 
      prev.map(issue => 
        issue.id === issueId ? { ...issue, fixed: true } : issue
      )
    );
  };

  const dismissMessage = (messageId: string) => {
    setMessages(prev =>
      prev.map(msg =>
        msg.id === messageId ? { ...msg, dismissed: true } : msg
      )
    );
  };

  const checkWinCondition = () => {
    const allFixed = codeIssues.every(issue => issue.fixed);
    if (allFixed && !courtCase) {
      setCourtCase("Congratulations! You completed all tasks without any legal violations!");
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!gameStarted) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              ⚖️ Court Room Simulation
            </h1>
            <div className="text-6xl mb-6">🏛️</div>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
              You're a developer under pressure. Fix code issues while managing distractions, 
              or face the consequences in court!
            </p>
          </div>

          <div 
            className="mb-8 p-6 rounded-lg bg-cover bg-center min-h-[200px] flex items-center justify-center"
            style={{
              backgroundImage: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 400 300\"><rect fill=\"%23654321\" width=\"400\" height=\"300\"/><rect fill=\"%238B4513\" x=\"150\" y=\"100\" width=\"100\" height=\"120\"/><circle fill=\"%23FFD700\" cx=\"200\" cy=\"80\" r=\"15\"/><rect fill=\"%23696969\" x=\"50\" y=\"200\" width=\"300\" height=\"20\"/><rect fill=\"%238B4513\" x=\"80\" y=\"150\" width=\"20\" height=\"70\"/><rect fill=\"%238B4513\" x=\"300\" y=\"150\" width=\"20\" height=\"70\"/></svg>')"
            }}
          >
            <div className="text-center text-white">
              <h3 className="text-2xl font-bold mb-2">Your Workspace</h3>
              <p className="text-lg">A typical developer's desk - but the pressure is on!</p>
            </div>
          </div>

          <div className="max-w-md mx-auto">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Set Timer (minutes):
              </label>
              <input
                type="number"
                min="1"
                max="30"
                value={customTime}
                onChange={(e) => setCustomTime(parseInt(e.target.value) || 5)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button
              onClick={startGame}
              className="w-full bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition-colors font-medium text-lg"
            >
              🚨 Start Court Room Challenge
            </button>
          </div>

          <div className="mt-8 bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-3">
              📋 How it Works:
            </h3>
            <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-2">
              <li>• Fix code issues before time runs out</li>
              <li>• Handle interruptions from boss, family, and agile team</li>
              <li>• Ignore critical tasks = face legal consequences!</li>
              <li>• Missing accessibility fixes = Disability Act violation</li>
              <li>• No input validation = Data breach lawsuit</li>
              <li>• Broken login = Contract violation & bankruptcy</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Game Status */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Court Room Challenge - Stage {currentStage}
                </h1>
                <div className={`text-2xl font-mono ${timeRemaining < 60 ? 'text-red-600' : 'text-blue-600'}`}>
                  ⏱️ {formatTime(timeRemaining)}
                </div>
              </div>
              <button
                onClick={resetGame}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
              >
                🔄 Reset
              </button>
            </div>
          </div>
        </div>

        {/* Messages Panel */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            📱 Messages
          </h2>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {messages.filter(msg => !msg.dismissed).map((message) => (
              <div
                key={message.id}
                className={`p-3 rounded-lg border ${
                  message.urgent 
                    ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                    : message.sender === 'boss' 
                    ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
                    : message.sender === 'family'
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                    : 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium text-sm capitalize text-gray-900 dark:text-white">
                      {message.sender === 'boss' ? '👔 Boss' : message.sender === 'family' ? '👨‍👩‍👧‍👦 Family' : '🔄 Agile Team'}
                    </div>
                    <div className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                      {message.text}
                    </div>
                  </div>
                  <button
                    onClick={() => dismissMessage(message.id)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-lg"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Code Issues */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            🐛 Code Issues
          </h2>
          <div className="space-y-4">
            {codeIssues.map((issue) => (
              <div
                key={issue.id}
                className={`p-4 rounded-lg border ${
                  issue.fixed 
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                    : issue.type === 'accessibility'
                    ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                    : issue.type === 'security' 
                    ? 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800'
                    : 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-900 dark:text-white text-sm">
                    {issue.type === 'accessibility' ? '♿' : issue.type === 'security' ? '🔒' : '⚙️'} {issue.description}
                  </h3>
                  {issue.fixed && <span className="text-green-600 text-xl">✅</span>}
                </div>
                
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                  <strong>Violation:</strong> {issue.violation}
                </div>
                
                <details className="mb-3">
                  <summary className="cursor-pointer text-sm text-blue-600 dark:text-blue-400 hover:underline">
                    View Code
                  </summary>
                  <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-700 rounded text-xs font-mono">
                    <div className="text-red-600 dark:text-red-400 mb-2">
                      {issue.code}
                    </div>
                    <div className="text-green-600 dark:text-green-400">
                      {issue.solution}
                    </div>
                  </div>
                </details>
                
                {!issue.fixed && (
                  <button
                    onClick={() => fixIssue(issue.id)}
                    className="w-full bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700 transition-colors"
                  >
                    🔧 Fix Issue
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Code Editor */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            💻 Code Editor
          </h2>
          <textarea
            value={selectedCode}
            onChange={(e) => setSelectedCode(e.target.value)}
            placeholder="Write your code here..."
            rows={15}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
          />
          <div className="mt-4 flex space-x-2">
            <button className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700 transition-colors">
              ▶️ Run Code
            </button>
            <button className="bg-purple-600 text-white px-4 py-2 rounded text-sm hover:bg-purple-700 transition-colors">
              🔍 Debug
            </button>
          </div>
        </div>
      </div>

      {/* Court Case Modal */}
      {(gameOver && courtCase) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full">
            <div className="p-6">
              <div className="text-center">
                <div 
                  className="w-full h-48 bg-cover bg-center rounded-lg mb-6"
                  style={{
                    backgroundImage: "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 400 300\"><rect fill=\"%23654321\" width=\"400\" height=\"300\"/><rect fill=\"%23D2691E\" x=\"150\" y=\"50\" width=\"100\" height=\"150\"/><circle fill=\"%23FFD700\" cx=\"200\" cy=\"30\" r=\"10\"/><rect fill=\"%238B4513\" x=\"50\" y=\"180\" width=\"300\" height=\"40\"/><polygon fill=\"%23654321\" points=\"50,180 350,180 200,120\"/></svg>')"
                  }}
                >
                  <div className="h-full flex items-center justify-center">
                    <h2 className="text-3xl font-bold text-white">🏛️ COURT ROOM</h2>
                  </div>
                </div>
                
                <div className={`text-2xl font-bold mb-4 ${
                  courtCase.includes('Congratulations') 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {courtCase.includes('Congratulations') ? '🎉' : '⚖️'} VERDICT
                </div>
                
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                  {courtCase}
                </p>
                
                <div className="space-y-2">
                  <button
                    onClick={resetGame}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    🔄 Try Again
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}