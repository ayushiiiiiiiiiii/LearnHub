import React, { useState } from 'react';
import { X, ChevronRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  webDevelopmentStructure,
  generativeAIStructure,
  dataStructuresStructure,
  blockchainStructure
} from '@/data';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isOpen: boolean;
  onClose: () => void;
  courseId: string;
}

const courseStructureData: Record<string, any> = {
  'web-development': webDevelopmentStructure,
  'generative-ai': generativeAIStructure,
  'data-structures': dataStructuresStructure,
  'blockchain': blockchainStructure,
};

export const Sidebar = ({ activeSection, onSectionChange, isOpen, onClose, courseId }: SidebarProps) => {
  const currentCourseData = courseStructureData[courseId] || courseStructureData['web-development'];
  const [expandedModules, setExpandedModules] = useState<number[]>([]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleModule = (index: number) => {
    setExpandedModules(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const toggleSidebar = () => setSidebarCollapsed(prev => !prev);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={cn(
        "fixed top-16 left-0 z-40 w-64 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Top bar with collapse arrow */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-2">
              <h2 className="font-semibold text-gray-900">Course Content</h2>
              <button
                className="ml-2 p-1 rounded hover:bg-gray-200 transition"
                onClick={toggleSidebar}
                aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {sidebarCollapsed ? (
                  <ChevronRight className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </button>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="lg:hidden">
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Course content */}
          {!sidebarCollapsed && (
            <div className="flex-1 overflow-y-auto">
              <div className="p-2">
                {currentCourseData.map((module: any, moduleIndex: number) => (
                  <div key={moduleIndex} className="mb-4">
                    <button
                      className="w-full flex items-center justify-between px-3 py-2 text-sm font-semibold text-gray-900 bg-gray-100 rounded-md mb-2 focus:outline-none"
                      onClick={() => toggleModule(moduleIndex)}
                    >
                      <span>{module.title}</span>
                      {expandedModules.includes(moduleIndex) ? (
                        <ChevronDown className="h-4 w-4 transition-transform" />
                      ) : (
                        <ChevronRight className="h-4 w-4 transition-transform" />
                      )}
                    </button>
                    {expandedModules.includes(moduleIndex) && (
                      <div className="space-y-1">
                        {module.sections.map((section: any) => (
                          <button
                            key={section.id}
                            onClick={() => {
                              onSectionChange(section.id);
                              onClose();
                            }}
                            className={cn(
                              "w-full flex items-center space-x-3 px-3 py-2 text-sm rounded-md transition-colors text-left",
                              activeSection === section.id
                                ? "bg-green-100 text-green-800 border-r-2 border-green-600"
                                : "text-gray-700 hover:bg-gray-100"
                            )}
                          >
                            <span className="flex-1">{section.title}</span>
                            <ChevronRight className="h-3 w-3 text-gray-400" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
