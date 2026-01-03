import { useState } from "react";
import { ArrowRightLeft, IndianRupee } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const RATES: Record<string, number> = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    JPY: 151.5,
    INR: 83.5,
    AUD: 1.52,
};

export function CurrencyConverter() {
    const [amount, setAmount] = useState<string>("1");
    const [from, setFrom] = useState("USD");
    const [to, setTo] = useState("INR");
    const [result, setResult] = useState<number | null>(null);

    const convert = () => {
        const val = parseFloat(amount);
        if (isNaN(val)) return;

        // Convert to USD base first, then to target
        const inUSD = val / RATES[from];
        const final = inUSD * RATES[to];
        setResult(final);
    };

    return (
        <Card className="glass border-primary/20 h-full">
            <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                    <IndianRupee size={18} className="text-primary" />
                    Currency Converter
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <div className="flex gap-2">
                        <Input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="bg-background/50"
                            placeholder="Amount"
                        />
                        <Select value={from} onValueChange={setFrom}>
                            <SelectTrigger className="w-[100px]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.keys(RATES).map((c) => (
                                    <SelectItem key={c} value={c}>
                                        {c}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex justify-center">
                        <Button variant="ghost" size="icon" onClick={() => {
                            setFrom(to);
                            setTo(from);
                        }}>
                            <ArrowRightLeft size={16} />
                        </Button>
                    </div>

                    <div className="flex gap-2">
                        <div className="flex-1 flex items-center justify-center bg-muted/30 rounded-md text-lg font-mono font-medium">
                            {result !== null ? result.toFixed(2) : "..."}
                        </div>
                        <Select value={to} onValueChange={setTo}>
                            <SelectTrigger className="w-[100px]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.keys(RATES).map((c) => (
                                    <SelectItem key={c} value={c}>
                                        {c}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <Button className="w-full" onClick={convert}>
                    Convert
                </Button>
            </CardContent>
        </Card>
    );
}
