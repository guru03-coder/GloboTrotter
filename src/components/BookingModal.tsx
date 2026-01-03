import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Loader2, IndianRupee } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

// Schema for booking form validation
const bookingSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    guests: z.string().transform((val) => parseInt(val, 10)).pipe(
        z.number().min(1, "At least 1 guest required").max(10, "Max 10 guests allowed")
    ),
    dateRange: z.object({
        from: z.date({ required_error: "Start date is required" }),
        to: z.date({ required_error: "End date is required" }),
    }).refine((data) => data.from < data.to, {
        message: "End date must be after start date",
        path: ["to"],
    }),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

import { addTrip } from "@/lib/trips";

interface BookingModalProps {
    placeName: string;
    placeLocation: string;
    placeImage: string;
    placeId: string; // Added placeId
    pricePerDay: number;
}

export function BookingModal({ placeName, placeLocation, placeImage, placeId, pricePerDay }: BookingModalProps) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const form = useForm<BookingFormValues>({
        resolver: zodResolver(bookingSchema),
        defaultValues: {
            name: "",
            email: "",
            guests: 1 as unknown as number,
        },
    });

    const onSubmit = async (data: BookingFormValues) => {
        setLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Save trip to storage
        addTrip({
            name: `${placeName} Trip`,
            destination: placeLocation,
            startDate: data.dateRange.from.toString(),
            endDate: data.dateRange.to.toString(),
            image: placeImage,
            guests: data.guests,
            placeId: placeId
        });

        setLoading(false);
        setOpen(false);

        toast({
            title: "Booking Confirmed! 🎉",
            description: `Your trip to ${placeName} has been booked for ${format(
                data.dateRange.from,
                "MMM d"
            )} - ${format(data.dateRange.to, "MMM d, yyyy")}. Check 'My Trips' to see details!`,
        });

        form.reset();
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="lg" className="w-full text-lg shadow-lg hover:shadow-xl transition-all duration-300">
                    Book Now
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] glass border-primary/20">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-primary">Book Your Trip</DialogTitle>
                    <DialogDescription>
                        Plan your adventure to <span className="font-semibold text-foreground">{placeName}</span>.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        {/* Name Field */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="John Doe" {...field} className="bg-background/50" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Email Field */}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="john@example.com" type="email" {...field} className="bg-background/50" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Guests Field */}
                        <FormField
                            control={form.control}
                            name="guests"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Number of Guests</FormLabel>
                                    <FormControl>
                                        <Input type="number" min="1" max="10" {...field} className="bg-background/50" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Date Range Parser - Simplified for this demo to just two date pickers or a range picker */}
                        <FormField
                            control={form.control}
                            name="dateRange"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Trip Dates</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-full pl-3 text-left font-normal bg-background/50",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value?.from ? (
                                                        field.value.to ? (
                                                            <>
                                                                {format(field.value.from, "LLL dd, y")} -{" "}
                                                                {format(field.value.to, "LLL dd, y")}
                                                            </>
                                                        ) : (
                                                            format(field.value.from, "LLL dd, y")
                                                        )
                                                    ) : (
                                                        <span>Pick a date range</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                initialFocus
                                                mode="range"
                                                defaultMonth={field.value?.from}
                                                selected={field.value as any}
                                                onSelect={field.onChange}
                                                numberOfMonths={2}
                                                disabled={(date) =>
                                                    date < new Date() || date < new Date("1900-01-01")
                                                }
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter className="pt-4">
                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        Confirm Booking
                                    </>
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
