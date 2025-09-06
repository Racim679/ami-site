import * as React from "react"
import { cn } from "@/lib/utils"

const EnhancedCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "luxury" | "glass" | "elevated" | "premium"
  }
>(({ className, variant = "default", ...props }, ref) => {
  const variants = {
    default: "rounded-2xl border border-border bg-card text-card-foreground shadow-md hover:shadow-lg transition-all duration-300",
    luxury: "rounded-2xl border border-primary/20 bg-gradient-to-br from-card via-card to-muted/30 text-card-foreground shadow-luxury hover:shadow-xl hover:scale-[1.02] transition-all duration-500",
    glass: "rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl text-white shadow-2xl hover:bg-white/20 transition-all duration-300",
    elevated: "rounded-2xl border-0 bg-gradient-to-br from-card to-muted/50 text-card-foreground shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300",
    premium: "rounded-2xl border border-accent/30 bg-gradient-to-br from-card via-muted/20 to-accent/5 text-card-foreground shadow-gold hover:shadow-luxury hover:scale-[1.02] transition-all duration-500 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-primary/5 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-1000"
  }
  
  return (
    <div
      ref={ref}
      className={cn(variants[variant], className)}
      {...props}
    />
  )
})
EnhancedCard.displayName = "EnhancedCard"

const EnhancedCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-3 p-8 pb-6", className)}
    {...props}
  />
))
EnhancedCardHeader.displayName = "EnhancedCardHeader"

const EnhancedCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl md:text-3xl font-bold font-heading leading-tight tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent",
      className
    )}
    {...props}
  />
))
EnhancedCardTitle.displayName = "EnhancedCardTitle"

const EnhancedCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-base md:text-lg text-muted-foreground font-body leading-relaxed", className)}
    {...props}
  />
))
EnhancedCardDescription.displayName = "EnhancedCardDescription"

const EnhancedCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-8 pt-0", className)} {...props} />
))
EnhancedCardContent.displayName = "EnhancedCardContent"

const EnhancedCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-8 pt-0", className)}
    {...props}
  />
))
EnhancedCardFooter.displayName = "EnhancedCardFooter"

export {
  EnhancedCard,
  EnhancedCardHeader,
  EnhancedCardFooter,
  EnhancedCardTitle,
  EnhancedCardDescription,
  EnhancedCardContent,
}