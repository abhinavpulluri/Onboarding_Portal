
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChecklistItem as ChecklistItemType } from "@/types/User";
import { Clock, ChevronDown, ChevronUp, Calendar, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChecklistItemProps {
  item: ChecklistItemType;
  onToggle: () => void;
}

export const ChecklistItem = ({ item, onToggle }: ChecklistItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const priorityColors = {
    high: "bg-red-100 text-red-800 border-red-200",
    medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
    low: "bg-green-100 text-green-800 border-green-200",
  };

  const isPastDue = item.dueDate && new Date(item.dueDate) < new Date() && !item.completed;

  return (
    <Card className={cn(
      "transition-all duration-200 hover:shadow-md border",
      item.completed ? "bg-gray-50 border-gray-200" : "bg-white border-gray-200",
      isPastDue && "border-red-300 bg-red-50"
    )}>
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <Checkbox
            checked={item.completed}
            onCheckedChange={onToggle}
            className="mt-1"
          />
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className={cn(
                "font-medium text-gray-900 transition-all",
                item.completed && "line-through text-gray-500"
              )}>
                {item.title}
              </h3>
              
              <div className="flex items-center space-x-2">
                {isPastDue && (
                  <AlertCircle className="w-4 h-4 text-red-500" />
                )}
                <Badge
                  variant="outline"
                  className={cn("text-xs", priorityColors[item.priority])}
                >
                  {item.priority}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="h-6 w-6 p-0"
                >
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{item.estimatedTime} min</span>
              </div>
              
              <Badge variant="secondary" className="text-xs">
                {item.category}
              </Badge>
              
              {item.dueDate && (
                <div className={cn(
                  "flex items-center space-x-1",
                  isPastDue && "text-red-600"
                )}>
                  <Calendar className="w-3 h-3" />
                  <span>
                    Due {new Date(item.dueDate).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
            
            {isExpanded && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-sm text-gray-700">{item.description}</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
