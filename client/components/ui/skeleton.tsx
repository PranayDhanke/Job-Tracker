import { cva, type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';

const skeletonVariants = cva(
  'animate-pulse rounded-md bg-muted',
  {
    variants: {
      variant: {
        default: '',
        circular: 'rounded-full',
        rectangular: 'rounded-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

type SkeletonVariantProps = VariantProps<typeof skeletonVariants>;

interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    SkeletonVariantProps {}

const Skeleton = ({ className, variant, ...props }: SkeletonProps) => {
  return (
    <div
      className={clsx(skeletonVariants({ variant }), className)}
      {...props}
    />
  );
};

export { Skeleton };
