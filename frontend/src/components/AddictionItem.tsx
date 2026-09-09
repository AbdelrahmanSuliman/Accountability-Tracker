import { Card, CardContent } from "@/components/ui/card";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { MoreVertical, Trash2, Pencil } from "lucide-react";

interface AddictionItemProps {
  addiction: {
    id: string;
    name: string;
  };
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
}

function AddictionItem({
  addiction,
  isSelected,
  onSelect,
  onDelete,
}: AddictionItemProps) {
  return (
    <Card
      className={`cursor-pointer transition-colors ${
        isSelected ? "border-primary bg-accent" : "hover:bg-accent "
      }`}
      onClick={onSelect}
    >
      <CardContent className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div>
            <p className="font-medium">{addiction.name}</p>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreVertical />
              </Button>
            }
          />

          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Pencil />
              Rename
            </DropdownMenuItem>

            <DropdownMenuItem
              variant="destructive"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
            >
              <Trash2 />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardContent>
    </Card>
  );
}

export default AddictionItem;
