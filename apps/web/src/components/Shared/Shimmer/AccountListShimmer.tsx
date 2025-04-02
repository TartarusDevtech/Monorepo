import SingleAccountShimmer from "./SingleAccountShimmer";

const AccountListShimmer = () => {
  return (
    <div className="divide-y divide-neutral-200 dark:divide-neutral-700">
      {Array.from({ length: 5 }).map((_, index) => (
        <SingleAccountShimmer
          key={index}
          className="p-5"
          showFollowUnfollowButton
        />
      ))}
    </div>
  );
};

export default AccountListShimmer;
