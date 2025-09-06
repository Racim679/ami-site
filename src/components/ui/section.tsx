import * as React from "react"
import { cn } from "@/lib/utils"

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "default" | "gradient" | "dark" | "muted" | "accent"
  container?: boolean
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, variant = "default", container = true, children, ...props }, ref) => {
    const variants = {
      default: "bg-background text-foreground",
      gradient: "bg-gradient-to-br from-muted via-background to-muted/50",
      dark: "bg-secondary text-secondary-foreground",
      muted: "bg-muted/30 text-foreground",
      accent: "bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5"
    }

    const content = container ? (
      <div className="container mx-auto px-4">
        {children}
      </div>
    ) : children

    return (
      <section
        ref={ref}
        className={cn(
          "py-16 md:py-24 transition-all duration-300",
          variants[variant],
          className
        )}
        {...props}
      >
        {content}
      </section>
    )
  }
)
Section.displayName = "Section"

const SectionHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-center mb-16 max-w-3xl mx-auto", className)}
    {...props}
  />
))
SectionHeader.displayName = "SectionHeader"

const SectionTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      "text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent leading-tight",
      className
    )}
    {...props}
  />
))
SectionTitle.displayName = "SectionTitle"

const SectionSubtitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-xl md:text-2xl text-muted-foreground font-body leading-relaxed",
      className
    )}
    {...props}
  />
))
SectionSubtitle.displayName = "SectionSubtitle"

export { Section, SectionHeader, SectionTitle, SectionSubtitle }