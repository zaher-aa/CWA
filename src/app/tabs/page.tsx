'use client'

import { useState, useEffect } from 'react'

interface Tab {
  id: string
  header: string
  content: string
}

export default function TabsPage() {
  const [tabs, setTabs] = useState<Tab[]>([])
  const [activeTab, setActiveTab] = useState('1')
  const [generatedCode, setGeneratedCode] = useState('')
  const [showOutput, setShowOutput] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Initialize with default tabs
  const defaultTabs: Tab[] = [
    { id: '1', header: 'Step 1', content: 'Enter your content for step 1' },
    { id: '2', header: 'Step 2', content: 'Enter your content for step 2' },
    { id: '3', header: 'Step 3', content: 'Enter your content for step 3' }
  ]

  // Handle hydration and load from localStorage
  useEffect(() => {
    setMounted(true)
    
    try {
      const savedTabs = localStorage.getItem('tabs')
      const savedActiveTab = localStorage.getItem('activeTab')
      
      if (savedTabs) {
        const parsedTabs = JSON.parse(savedTabs)
        if (Array.isArray(parsedTabs) && parsedTabs.length > 0) {
          setTabs(parsedTabs)
          if (savedActiveTab && parsedTabs.find(tab => tab.id === savedActiveTab)) {
            setActiveTab(savedActiveTab)
          } else {
            setActiveTab(parsedTabs[0].id)
          }
          return
        }
      }
    } catch (error) {
      console.error('Error loading saved tabs:', error)
    }
    
    // Fallback to default tabs
    setTabs(defaultTabs)
    setActiveTab('1')
  }, [])

  // Save tabs to localStorage whenever tabs change (only after mounted)
  useEffect(() => {
    if (mounted && tabs.length > 0) {
      localStorage.setItem('tabs', JSON.stringify(tabs))
    }
  }, [tabs, mounted])

  // Save active tab to localStorage (only after mounted)
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('activeTab', activeTab)
    }
  }, [activeTab, mounted])

  const addTab = () => {
    if (tabs.length >= 15) {
      alert('Maximum of 15 tabs allowed')
      return
    }
    
    const newId = (parseInt(tabs[tabs.length - 1]?.id || '0') + 1).toString()
    const newTab: Tab = {
      id: newId,
      header: `Step ${newId}`,
      content: `Enter your content for step ${newId}`
    }
    setTabs([...tabs, newTab])
    setActiveTab(newId)
  }

  const removeTab = () => {
    if (tabs.length <= 1) {
      alert('At least one tab is required')
      return
    }
    
    const updatedTabs = tabs.filter(tab => tab.id !== activeTab)
    setTabs(updatedTabs)
    
    // Set active tab to the first remaining tab
    if (updatedTabs.length > 0) {
      setActiveTab(updatedTabs[0].id)
    }
  }

  const updateTabHeader = (id: string, newHeader: string) => {
    setTabs(tabs.map(tab => 
      tab.id === id ? { ...tab, header: newHeader } : tab
    ))
  }

  const updateTabContent = (id: string, newContent: string) => {
    setTabs(tabs.map(tab => 
      tab.id === id ? { ...tab, content: newContent } : tab
    ))
  }

  const generateHTMLOutput = () => {
    const tabHeaders = tabs.map((tab, index) => 
      `<button onclick="openTab(event, 'tab${tab.id}')" style="background-color: ${index === 0 ? '#ccc' : '#f1f1f1'}; border: none; outline: none; cursor: pointer; padding: 14px 16px; transition: 0.3s; font-size: 16px; margin-right: 2px;">${tab.header}</button>`
    ).join('\n    ')

    const tabContents = tabs.map((tab, index) => 
      `<div id="tab${tab.id}" style="display: ${index === 0 ? 'block' : 'none'}; padding: 12px; border: 1px solid #ccc; border-top: none; background-color: white; min-height: 200px;">\n      <p style="margin: 0; font-size: 14px; line-height: 1.5;">${tab.content}</p>\n    </div>`
    ).join('\n    ')

    const htmlOutput = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated Tabs</title>
</head>
<body style="font-family: Arial, sans-serif; margin: 20px; background-color: #f5f5f5;">
    <div style="max-width: 800px; margin: 0 auto; background-color: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); overflow: hidden;">
        <h2 style="margin: 0; padding: 20px; background-color: #333; color: white; text-align: center;">Interactive Tabs</h2>
        
        <div style="background-color: #f1f1f1; padding: 0; border-bottom: 1px solid #ccc;">
            ${tabHeaders}
        </div>
        
        ${tabContents}
    </div>

    <script>
        function openTab(evt, tabName) {
            var i, tabcontent, tablinks;
            
            // Hide all tab content
            tabcontent = document.querySelectorAll('[id^="tab"]');
            for (i = 0; i < tabcontent.length; i++) {
                tabcontent[i].style.display = "none";
            }
            
            // Remove active class from all tab buttons
            tablinks = document.querySelectorAll('button[onclick^="openTab"]');
            for (i = 0; i < tablinks.length; i++) {
                tablinks[i].style.backgroundColor = "#f1f1f1";
            }
            
            // Show the selected tab and mark button as active
            document.getElementById(tabName).style.display = "block";
            evt.currentTarget.style.backgroundColor = "#ccc";
        }
    </script>
</body>
</html>`

    setGeneratedCode(htmlOutput)
    setShowOutput(true)
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedCode)
      alert('Code copied to clipboard!')
    } catch (error) {
      console.error('Failed to copy:', error)
      alert('Failed to copy code')
    }
  }

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          HTML5 Tabs Generator
        </h1>
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
        HTML5 Tabs Generator
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Tab Builder */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Tab Builder ({tabs.length}/15)
            </h2>
            <div className="space-x-2">
              <button
                onClick={addTab}
                disabled={tabs.length >= 15}
                className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed focus-visible:focus"
                aria-label="Add new tab"
              >
                + Add Tab
              </button>
              <button
                onClick={removeTab}
                disabled={tabs.length <= 1}
                className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed focus-visible:focus"
                aria-label="Remove current tab"
              >
                - Remove Tab
              </button>
            </div>
          </div>

          {/* Tab Headers */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tab Headers:
            </label>
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded border focus-visible:focus ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {tab.header}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Header Editor */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Edit Tab Header:
            </label>
            <input
              type="text"
              value={tabs.find(tab => tab.id === activeTab)?.header || ''}
              onChange={(e) => updateTabHeader(activeTab, e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter tab header..."
            />
          </div>

          {/* Tab Content Editor */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Edit Tab Content:
            </label>
            <textarea
              value={tabs.find(tab => tab.id === activeTab)?.content || ''}
              onChange={(e) => updateTabContent(activeTab, e.target.value)}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter tab content..."
            />
          </div>

          {/* Generate Button */}
          <button
            onClick={generateHTMLOutput}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium focus-visible:focus"
          >
            Generate HTML5 Output
          </button>
        </div>

        {/* Preview */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Live Preview
          </h2>
          
          <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
            {/* Preview Tab Headers */}
            <div className="bg-gray-100 dark:bg-gray-700 flex flex-wrap border-b border-gray-300 dark:border-gray-600">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-3 text-sm font-medium border-r border-gray-300 dark:border-gray-600 last:border-r-0 hover:bg-gray-200 dark:hover:bg-gray-600 focus-visible:focus ${
                    activeTab === tab.id
                      ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {tab.header}
                </button>
              ))}
            </div>
            
            {/* Preview Tab Content */}
            <div className="p-4 min-h-[200px] bg-white dark:bg-gray-800">
              <div className="tab-content">
                {tabs.find(tab => tab.id === activeTab)?.content || ''}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Generated Output Modal */}
      {showOutput && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Generated HTML5 Code
              </h3>
              <button
                onClick={() => setShowOutput(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-2xl focus-visible:focus"
                aria-label="Close output modal"
              >
                ×
              </button>
            </div>
            
            <div className="p-6">
              <div className="mb-4 flex space-x-2">
                <button
                  onClick={copyToClipboard}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors focus-visible:focus"
                >
                  📋 Copy Code
                </button>
                <a
                  href={`data:text/html;charset=utf-8,${encodeURIComponent(generatedCode)}`}
                  download="generated-tabs.html"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors inline-block focus-visible:focus"
                >
                  💾 Download HTML
                </a>
              </div>
              
              <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-auto max-h-96">
                <pre className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap font-mono">
                  {generatedCode}
                </pre>
              </div>
              
              <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  <strong>Instructions:</strong> Copy the code above and paste it into a new file with a .html extension. 
                  The file will work as a standalone HTML page with no external dependencies.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}