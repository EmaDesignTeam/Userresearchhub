# Design Components & Design Systems Guide

## Table of Contents
1. [Introduction](#introduction)
2. [What is a Design System?](#what-is-a-design-system)
3. [What are Design Components?](#what-are-design-components)
4. [The shadcn/ui Approach](#the-shadcnui-approach)
5. [How to Create Design Components](#how-to-create-design-components)
6. [Best Practices](#best-practices)
7. [Component Examples](#component-examples)
8. [Resources](#resources)

---

## Introduction

Building high-quality digital products requires more than just good code—it demands **consistency**, **scalability**, and **accessibility**. This is where design systems and design components come in. They provide a structured, unified language that ensures every button, input field, and modal across your application looks and behaves the same way.

This guide provides an in-depth look at design systems and components, with a special focus on **shadcn/ui**—a modern approach to building and distributing design components.

---

## What is a Design System?

### Definition
A **design system** is a comprehensive "single source of truth" for a product's user interface. It's much more than a collection of buttons or color palettes—it's a complete ecosystem that includes:

- **Design Tokens**: The smallest design decisions (colors, spacing, typography, border-radius)
- **Component Library**: Reusable UI elements (buttons, inputs, cards, modals)
- **Pattern Library**: Combined components that solve specific user flows (e.g., search bars with dropdowns)
- **Brand Guidelines**: Principles, voice, tone, logo usage, and imagery standards
- **Documentation**: Usage guidelines, code snippets, and accessibility notes
- **Design Principles**: The "why" behind design decisions

### The DNA of Your Product
Think of a design system as the "DNA" of your product. Just as DNA provides the blueprint for biological organisms, a design system provides the blueprint for consistent, cohesive user experiences across all platforms and touchpoints.

### Benefits of a Design System
1. **Consistency**: Ensures all UI elements look and behave the same across the entire application
2. **Efficiency**: Developers and designers can reuse components instead of rebuilding from scratch
3. **Scalability**: Easy to add new features while maintaining design coherence
4. **Collaboration**: Provides a common language between designers, developers, and stakeholders
5. **Accessibility**: When built correctly, ensures all users can interact with your product
6. **Maintenance**: Updates to a component automatically propagate across the entire application

### Famous Design Systems
- **Material Design** (Google)
- **Human Interface Guidelines** (Apple)
- **Polaris** (Shopify)
- **Carbon** (IBM)
- **Ant Design** (Alibaba)
- **Fluent** (Microsoft)

---

## What are Design Components?

### Definition
**Design components** are the modular, reusable building blocks of a user interface. They are self-contained pieces of UI that can be used independently or combined to create more complex interfaces.

### Atomic Design Hierarchy
Components are typically organized using the **Atomic Design** principle, popularized by Brad Frost:

#### 1. **Atoms** 
The smallest functional elements that cannot be broken down further without losing meaning:
- Button
- Input field
- Label
- Icon
- Checkbox

#### 2. **Molecules**
Groups of atoms functioning together as a unit:
- Search bar (Input + Button + Icon)
- Form field (Label + Input + Error message)
- Card header (Avatar + Title + Subtitle)

#### 3. **Organisms**
Complex UI sections composed of molecules and atoms:
- Navigation bar (Logo + Menu items + Search + User profile)
- Product card (Image + Title + Price + Add to cart button)
- Form section (Multiple form fields + Submit button)

#### 4. **Templates**
Page-level layouts that show how organisms work together:
- Dashboard layout
- Authentication page layout
- Settings page layout

#### 5. **Pages**
Specific instances of templates with real content

### Characteristics of Quality Components
Every component in your design system should be:

1. **Modular**: Independent and capable of being used in various contexts
2. **Scalable**: Adapts to different screen sizes and platforms
3. **Accessible**: Follows WCAG guidelines (contrast, keyboard navigation, screen readers)
4. **Customizable**: Supports themes and configuration options
5. **Understandable**: Includes clear documentation on usage and props
6. **Versionable**: Changes are tracked so updates don't break existing layouts
7. **Testable**: Logic and appearance are verified through automated tests
8. **Reusable**: Reduces the need for custom one-off solutions

---

## The shadcn/ui Approach

### What Makes shadcn/ui Different?

**shadcn/ui** is NOT a traditional component library like Material UI or Ant Design. Instead, it's a **component distribution platform** that gives you full ownership and control over your UI code.

### Key Philosophical Differences

#### Traditional Libraries (e.g., Material UI)
```bash
npm install @mui/material
```
```tsx
import { Button } from '@mui/material'
// You're locked into their API and styling system
<Button variant="contained">Click me</Button>
```

**Problems:**
- You don't own the source code
- Customization requires overrides and workarounds
- Bundle size includes entire library
- Updates can break your application
- Locked into their design decisions

#### The shadcn/ui Way
```bash
npx shadcn@latest add button
```
```tsx
import { Button } from '@/components/ui/button'
// The source code is in YOUR project, fully customizable
<Button variant="default">Click me</Button>
```

**Advantages:**
- ✅ You own the source code
- ✅ Direct customization (just edit the file)
- ✅ Only includes what you use
- ✅ No dependency lock-in
- ✅ Full control over behavior and styling

### Technical Foundation

shadcn/ui is built on three core technologies:

#### 1. **Radix UI** (Logic & Accessibility)
Provides unstyled, accessible components called "primitives." These handle:
- Keyboard navigation (Tab, Enter, Escape, Arrow keys)
- Screen reader support (ARIA roles and labels)
- Focus management
- Component behavior and state

#### 2. **Tailwind CSS** (Styling)
Utility-first CSS framework that allows you to:
- Style components directly in JSX
- Avoid CSS specificity issues
- Keep styles local to components
- Easily create responsive designs

#### 3. **Class Variance Authority (CVA)** (Variant Management)
A utility for managing component variants:
```tsx
const buttonVariants = cva(
  "base-classes",
  {
    variants: {
      variant: {
        default: "bg-primary text-white",
        outline: "border border-gray-300"
      },
      size: {
        sm: "h-8 px-3",
        lg: "h-12 px-6"
      }
    }
  }
)
```

### Component Architecture

shadcn/ui uses **composition over configuration**. Instead of one massive component with 50 props, components are broken down into sub-components:

#### ❌ Bad (Prop Drilling)
```tsx
<Card 
  title="Hello" 
  subtitle="World" 
  footer="Bye"
  headerClassName="..."
  bodyClassName="..."
  footerClassName="..."
/>
```

#### ✅ Good (Composition)
```tsx
<Card>
  <CardHeader>
    <CardTitle>Hello</CardTitle>
    <CardDescription>World</CardDescription>
  </CardHeader>
  <CardContent>
    Main content goes here
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

### CLI Workflow

shadcn/ui provides a command-line interface for adding components:

```bash
# Initialize shadcn/ui in your project
npx shadcn@latest init

# Add specific components
npx shadcn@latest add button
npx shadcn@latest add dialog
npx shadcn@latest add card

# Add multiple components at once
npx shadcn@latest add button input label
```

When you run these commands, the CLI:
1. Downloads the component source code
2. Places it in your `components/ui/` directory
3. Updates your dependencies if needed
4. Configures your Tailwind CSS if needed

### Component Categories

shadcn/ui organizes 50+ components into functional groups:

#### Actions
- Button, Toggle, Toggle Group, Context Menu

#### Forms & Inputs
- Input, Checkbox, Radio Group, Select, Slider, Switch, Textarea, Date Picker, Form

#### Layout
- Card, Accordion, Tabs, Scroll Area, Separator, Resizable, Collapsible

#### Feedback & Status
- Alert, Badge, Progress, Skeleton, Toast (Sonner), Tooltip

#### Navigation
- Breadcrumb, Navigation Menu, Pagination, Sidebar, Command Menu

#### Overlays
- Dialog, Sheet, Drawer, Popover, Hover Card, Alert Dialog

#### Data Display
- Table, Avatar, Calendar, Chart

---

## How to Create Design Components

Creating effective design components requires a structured approach. Here's a comprehensive guide inspired by the shadcn/ui methodology.

### Step 1: Define Design Tokens

Before writing any component code, establish your **design tokens**—the atomic variables that define your design system.

#### Color Tokens
```css
:root {
  /* Primary colors */
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  
  /* Secondary colors */
  --secondary: 210 40% 96.1%;
  --secondary-foreground: 222.2 47.4% 11.2%;
  
  /* Destructive (error) colors */
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;
  
  /* Neutral colors */
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  
  /* Border and input */
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  
  /* Radius */
  --radius: 0.5rem;
}
```

#### Typography Tokens
```css
:root {
  /* Font families */
  --font-sans: ui-sans-serif, system-ui, sans-serif;
  --font-mono: ui-monospace, monospace;
  
  /* Font sizes */
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  
  /* Line heights */
  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.75;
}
```

#### Spacing Tokens
```css
:root {
  --spacing-1: 0.25rem;  /* 4px */
  --spacing-2: 0.5rem;   /* 8px */
  --spacing-3: 0.75rem;  /* 12px */
  --spacing-4: 1rem;     /* 16px */
  --spacing-6: 1.5rem;   /* 24px */
  --spacing-8: 2rem;     /* 32px */
}
```

### Step 2: Set Up Your Technical Stack

#### Install Required Dependencies
```bash
# Core dependencies
npm install react react-dom

# Styling
npm install tailwindcss postcss autoprefixer
npm install clsx tailwind-merge
npm install class-variance-authority

# Radix UI primitives (install as needed)
npm install @radix-ui/react-dialog
npm install @radix-ui/react-dropdown-menu
npm install @radix-ui/react-select
npm install @radix-ui/react-tooltip
```

#### Create Utility Function
Create a utility function to merge Tailwind classes:

```typescript
// lib/utils.ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

This utility:
- Combines class names using `clsx`
- Resolves Tailwind class conflicts using `twMerge`
- Allows for conditional class application

### Step 3: Build Your First Component

Let's build a **Button** component from scratch using the shadcn/ui pattern.

#### Button Component (Complete Example)

```tsx
// components/ui/button.tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Define all style variants using CVA
const buttonVariants = cva(
  // Base styles (always applied)
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      // Visual variants
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      // Size variants
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    // Default values if not specified
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

// TypeScript interface for props
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

// The actual Button component
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
```

#### Usage Examples

```tsx
import { Button } from "@/components/ui/button"

// Basic usage
<Button>Click me</Button>

// Different variants
<Button variant="destructive">Delete</Button>
<Button variant="outline">Cancel</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Learn more</Button>

// Different sizes
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon">
  <IconTrash />
</Button>

// With custom classes
<Button className="w-full">Full Width</Button>

// Disabled state
<Button disabled>Disabled</Button>

// As a different element (using asChild)
<Button asChild>
  <a href="/dashboard">Go to Dashboard</a>
</Button>
```

### Step 4: Build a Complex Component (Dialog)

Complex components like modals/dialogs benefit greatly from composition. Here's how to build a Dialog component:

```tsx
// components/ui/dialog.tsx
import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

// Root dialog component
const Dialog = DialogPrimitive.Root

// Trigger button
const DialogTrigger = DialogPrimitive.Trigger

// Portal for rendering outside DOM hierarchy
const DialogPortal = DialogPrimitive.Portal

// Close button
const DialogClose = DialogPrimitive.Close

// Overlay (backdrop)
const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

// Content (the actual dialog box)
const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

// Header section
const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

// Footer section
const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"

// Title
const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

// Description
const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
```

#### Dialog Usage Example

```tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

function DeleteConfirmation() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete Account</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button variant="destructive" onClick={handleDelete}>
            Delete Account
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
```

### Step 5: Ensure Accessibility

Accessibility should be built into every component from the start, not added as an afterthought.

#### Key Accessibility Principles

1. **Keyboard Navigation**
   - All interactive elements should be keyboard accessible
   - Use proper focus management
   - Support standard keyboard shortcuts (Tab, Enter, Escape, Arrow keys)

2. **Screen Reader Support**
   - Use semantic HTML (`<button>`, `<nav>`, `<main>`)
   - Add ARIA labels and roles when needed
   - Provide alternative text for images
   - Use `aria-describedby` for help text

3. **Color Contrast**
   - Ensure text meets WCAG AA standards (4.5:1 for normal text)
   - Don't rely on color alone to convey information

4. **Focus Indicators**
   - Always show visible focus states
   - Use `focus-visible` to hide focus for mouse users

#### Accessibility Checklist for Components

```tsx
// ✅ Good accessibility practices
<button
  type="button"
  aria-label="Close dialog"
  aria-describedby="dialog-description"
  disabled={isLoading}
>
  <X className="h-4 w-4" />
  <span className="sr-only">Close</span>  {/* Screen reader only */}
</button>

// ❌ Bad accessibility
<div onClick={handleClick}>  {/* Not keyboard accessible */}
  <img src="icon.png" />  {/* No alt text */}
</div>
```

### Step 6: Document Your Components

Documentation is critical for component adoption and proper usage.

#### Component Documentation Template

```markdown
# Button Component

## Overview
A versatile button component that supports multiple variants and sizes.

## Installation
\`\`\`bash
npx shadcn@latest add button
\`\`\`

## Usage
\`\`\`tsx
import { Button } from "@/components/ui/button"

<Button>Click me</Button>
\`\`\`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | "default" \| "destructive" \| "outline" \| "secondary" \| "ghost" \| "link" | "default" | Visual style variant |
| size | "default" \| "sm" \| "lg" \| "icon" | "default" | Size of the button |
| asChild | boolean | false | Render as a child component (using Slot) |
| disabled | boolean | false | Disables the button |

## Examples

### Variants
\`\`\`tsx
<Button variant="default">Default</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
\`\`\`

### With Icons
\`\`\`tsx
<Button>
  <Mail className="mr-2 h-4 w-4" />
  Send Email
</Button>
\`\`\`

## Accessibility
- Fully keyboard accessible
- Supports focus states
- Uses semantic `<button>` element
- Includes disabled state styling

## Source Code
View the full source code in `components/ui/button.tsx`
```

---

## Best Practices

### 1. Component Design Principles

#### Single Responsibility
Each component should do one thing well.

```tsx
// ❌ Bad: Component doing too much
<SuperCard 
  hasHeader 
  hasFooter 
  hasImage 
  hasActions 
  layout="grid"
  theme="dark"
/>

// ✅ Good: Focused, composable components
<Card>
  <CardHeader>...</CardHeader>
  <CardContent>...</CardContent>
  <CardFooter>...</CardFooter>
</Card>
```

#### Composition Over Configuration
Build complex UIs by composing simple components.

```tsx
// ❌ Bad: Too many props
<Form 
  fields={[...]} 
  validation={...} 
  onSubmit={...} 
  layout="vertical"
  showLabels
  showErrors
/>

// ✅ Good: Composition
<Form onSubmit={handleSubmit}>
  <FormField>
    <FormLabel>Email</FormLabel>
    <FormControl>
      <Input type="email" />
    </FormControl>
    <FormMessage />
  </FormField>
  <Button type="submit">Submit</Button>
</Form>
```

### 2. TypeScript Best Practices

#### Extend Native HTML Props
Make your components feel native by extending HTML element props.

```tsx
// Extend button props
interface ButtonProps 
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline"
  size?: "sm" | "md" | "lg"
}

// This allows all native button props to work
<Button onClick={...} type="submit" disabled className="..." />
```

#### Use Discriminated Unions for Variants
```tsx
type ButtonProps = 
  | { variant: "link"; href: string }
  | { variant: "default" | "outline"; href?: never }

// TypeScript enforces href when variant is "link"
```

### 3. Styling Best Practices

#### Use CSS Variables for Theming
```css
:root {
  --primary: 222.2 47.4% 11.2%;
}

.dark {
  --primary: 210 40% 98%;
}
```

```tsx
// Automatically adapts to theme
<div className="bg-primary text-primary-foreground" />
```

#### Avoid Hardcoded Colors
```tsx
// ❌ Bad
<div className="bg-blue-500" />

// ✅ Good
<div className="bg-primary" />
```

### 4. Performance Optimization

#### Lazy Load Heavy Components
```tsx
import { lazy, Suspense } from 'react'

const Dialog = lazy(() => import('@/components/ui/dialog'))

function MyComponent() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Dialog />
    </Suspense>
  )
}
```

#### Memoize Expensive Computations
```tsx
import { useMemo } from 'react'

function DataTable({ data }) {
  const sortedData = useMemo(
    () => data.sort((a, b) => a.name.localeCompare(b.name)),
    [data]
  )
  
  return <Table data={sortedData} />
}
```

### 5. Testing Components

#### Unit Tests with Vitest/Jest
```tsx
import { render, screen } from '@testing-library/react'
import { Button } from './button'

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })
  
  it('applies variant classes', () => {
    render(<Button variant="destructive">Delete</Button>)
    const button = screen.getByText('Delete')
    expect(button).toHaveClass('bg-destructive')
  })
  
  it('handles click events', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click</Button>)
    screen.getByText('Click').click()
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

---

## Component Examples

### Card Component

```tsx
// components/ui/card.tsx
import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
```

#### Usage
```tsx
<Card>
  <CardHeader>
    <CardTitle>Create project</CardTitle>
    <CardDescription>Deploy your new project in one-click.</CardDescription>
  </CardHeader>
  <CardContent>
    <form>
      <Input placeholder="Project name" />
    </form>
  </CardContent>
  <CardFooter>
    <Button>Deploy</Button>
  </CardFooter>
</Card>
```

### Input Component

```tsx
// components/ui/input.tsx
import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
```

### Badge Component

```tsx
// components/ui/badge.tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
```

---

## Resources

### Official Documentation
- [shadcn/ui Official Website](https://ui.shadcn.com/)
- [shadcn/ui Documentation](https://ui.shadcn.com/docs)
- [shadcn/ui Component List](https://ui.shadcn.com/docs/components)

### Design System References
- [Figma - Design Systems 101](https://www.figma.com/blog/design-systems-101-what-is-a-design-system/)
- [HubSpot - What's a Design System?](https://blog.hubspot.com/website/design-system)
- [UXPin - 13 Best Design System Examples](https://www.uxpin.com/studio/blog/best-design-system-examples/)
- [Supernova.io - Fundamentals of Design System Components](https://www.supernova.io/blog/fundamentals-of-design-system-components)

### Technical Foundations
- [Radix UI Documentation](https://www.radix-ui.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Class Variance Authority](https://cva.style/docs)

### Design Patterns
- [Neue World - Components of a Design System](https://www.neue.world/learn/design-system/the-components-of-a-design-system)
- [Medium - A Guide to Creating Design Components](https://medium.com/design-bootcamp/component-handbook-65d3001044ec)
- [GoVisually - 15 Essential Components in a Design System](https://govisually.com/blog/components-in-a-design-system/)

### Tools
- [Storybook](https://storybook.js.org/) - Component documentation and testing
- [Figma](https://www.figma.com/) - Design system design and prototyping
- [Zeroheight](https://zeroheight.com/) - Design system documentation platform

---

## Conclusion

Building a robust design system and component library is an investment that pays dividends in consistency, efficiency, and maintainability. The shadcn/ui approach represents a paradigm shift in how we think about component libraries—moving from black-box dependencies to owned, customizable code.

### Key Takeaways

1. **Design systems are more than components** - They include tokens, patterns, guidelines, and documentation
2. **Composition beats configuration** - Break components into smaller, focused pieces
3. **Accessibility is not optional** - Build it in from the start
4. **You should own your UI code** - Don't be locked into library constraints
5. **Documentation drives adoption** - Components without docs won't be used

Start small, iterate often, and remember: the best design system is the one your team actually uses.

---

*Last updated: January 2026*
*Based on research from shadcn/ui, Radix UI, and modern design system best practices*
