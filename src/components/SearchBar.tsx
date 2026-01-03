import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

const SearchBar = ({ placeholder = "Search destinations, trips, activities...", onSearch }: SearchBarProps) => {
  return (
    <div className="w-full glass-card p-2 flex items-center gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
        <Input
          type="text"
          placeholder={placeholder}
          onChange={(e) => onSearch?.(e.target.value)}
          className="pl-12 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="text-muted-foreground gap-2">
          <span>Filter</span>
          <SlidersHorizontal size={16} />
        </Button>
        <Button variant="ghost" size="sm" className="text-muted-foreground gap-2">
          <span>Sort</span>
          <ChevronDown size={16} />
        </Button>
        <Button variant="ghost" size="sm" className="text-muted-foreground gap-2">
          <span>Group by</span>
          <ChevronDown size={16} />
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
