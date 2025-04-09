interface GraphStatsShimmerProps {
  count: number;
}

const GraphStatsShimmer = ({ count }: GraphStatsShimmerProps) => {
  return (
    <div className="flex gap-5 pb-1">
      {Array.from({ length: count }).map((_, index) => (
        <div className="flex items-center gap-x-2" key={index}>
          <div className="shimmer size-4 rounded-lg" />
          <div className="shimmer h-3 w-20 rounded-lg" />
        </div>
      ))}
    </div>
  );
};

export default GraphStatsShimmer;
