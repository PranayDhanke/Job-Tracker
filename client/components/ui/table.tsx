import * as React from 'react';

export const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, children, ...props }, ref) => {
  return (
    <table
      ref={ref}
      className={`
        w-full text-sm text-left rtl:text-right text-muted-text
        ${className}
      `}
      {...props}
    >
      {children}
    </table>
  );
});
Table.displayName = 'Table';

export const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, children, ...props }, ref) => {
  return (
    <thead
      ref={ref}
      className={`
        bg-secondary-card
        ${className}
      `}
      {...props}
    >
      {children}
    </thead>
  );
});
TableHeader.displayName = 'TableHeader';

export const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, children, ...props }, ref) => {
  return (
    <tbody
      ref={ref}
      className={`
        bg-card divide-y divide-border
        ${className}
      `}
      {...props}
    >
      {children}
    </tbody>
  );
});
TableBody.displayName = 'TableBody';

export const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, children, ...props }, ref) => {
  return (
    <tr
      ref={ref}
      className={`
        hover:bg-secondary-card/50
        ${className}
      `}
      {...props}
    >
      {children}
    </tr>
  );
});
TableRow.displayName = 'TableRow';

export const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.HTMLAttributes<HTMLTableCellElement>
>(({ className, children, ...props }, ref) => {
  return (
    <th
      ref={ref}
      className={`
        px-6 py-3 text-left text-xs font-medium text-muted-text uppercase
        ${className}
      `}
      {...props}
    >
      {children}
    </th>
  );
});
TableHead.displayName = 'TableHead';

export const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.HTMLAttributes<HTMLTableCellElement>
>(({ className, children, ...props }, ref) => {
  return (
    <td
      ref={ref}
      className={`
        px-6 py-4
        ${className}
      `}
      {...props}
    >
      {children}
    </td>
  );
});
TableCell.displayName = 'TableCell';
