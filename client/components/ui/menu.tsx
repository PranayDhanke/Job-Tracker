'use client';

import * as React from 'react';
import { Check } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';

const MenuContext = React.createContext({
  open: false,
  onOpenChange: (open: boolean) => {},
});

export const Menu = ({ children, ...props }: React.PropsWithChildren<{}>) => {
  const [open, setOpen] = React.useState(false);
  return (
    <MenuContext.Provider value={{ open, onOpenChange: setOpen }}>
      <div {...props} />
    </MenuContext.Provider>
  );
};
Menu.displayName = 'Menu';

export const MenuTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, ...props }, ref) => {
  const context = React.useContext(MenuContext);
  if (!context) {
    throw new Error('MenuTrigger must be used within Menu');
  }
  const handleClick = () => {
    context.onOpenChange(!context.open);
  };
  return (
    <button
      ref={ref}
      onClick={handleClick}
      aria-haspopup="menu"
      aria-expanded={context.open}
      {...props}
    >
      {children}
    </button>
  );
});
MenuTrigger.displayName = 'MenuTrigger';

export const MenuContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = '', children, ...props }, ref) => {
  const context = React.useContext(MenuContext);
  if (!context) {
    throw new Error('MenuContent must be used within Menu');
  }
  return (
    <div
      ref={ref}
      className={clsx(
        'origin-top-right z-50 mt-2 w-56 rounded-md bg-card p-1',
        'shadow-lg border border-border',
        className
      )}
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
      style={{ display: context.open ? 'block' : 'none' }}
      {...props}
    >
      {children}
    </div>
  );
});
MenuContent.displayName = 'MenuContent';

export const MenuItem = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className = '', children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={clsx(
        'flex w-full cursor-default items-center rounded-sm px-2 py-1.5 text-sm',
        'outline-none transition-colors focus:bg-primary focus:text-primary-foreground',
        'disabled:pointer-events-none disabled:opacity-50',
        className
      )}
      role="menuitem"
      {...props}
    >
      {children}
    </button>
  );
});
MenuItem.displayName = 'MenuItem';

export const MenuCommand = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className = '', children, ...props }, ref) => {
  return (
    <MenuItem className={className} {...props}>
      {children}
    </MenuItem>
  );
});
MenuCommand.displayName = 'MenuCommand';

export const MenuCheckboxItem = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement> & { checked?: boolean; onCheckedChange?: (checked: boolean) => void }
>(({ className = '', children, checked = false, onCheckedChange, ...props }, ref) => {
  return (
    <label
      ref={ref}
      className={clsx(
        'flex w-full cursor-default items-center rounded-sm px-2 py-1.5 text-sm',
        'outline-none transition-colors focus:bg-primary focus:text-primary-foreground',
        'disabled:pointer-events-none disabled:opacity-50',
        className
      )}
      role="menuitemcheckbox"
      aria-checked={checked}
      {...props}
    >
      <span className="sr-only">{children}</span>
      <span className="flex items-center space-x-3">
        <span className="h-3 w-3 rounded border bg-background flex items-center justify-center">
          {checked ? <Check className="h-2.5 w-2.5 text-primary" /> : null}
        </span>
        <span>{children}</span>
      </span>
    </label>
  );
});
MenuCheckboxItem.displayName = 'MenuCheckboxItem';

export const MenuSeparator = React.forwardRef<
  HTMLHRElement,
  React.HTMLAttributes<HTMLHRElement>
>(({ className = '', ...props }, ref) => {
  return (
    <hr
      ref={ref}
      className={clsx('-mx-1 my-1 h-0 bg-border', className)}
      role="separator"
      {...props}
    />
  );
});
MenuSeparator.displayName = 'MenuSeparator';

export const MenuShortcut = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className = '', ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={clsx('mr-2 text-xs tracking-widest text-muted-text', className)}
      {...props}
    />
  );
});
MenuShortcut.displayName = 'MenuShortcut';
