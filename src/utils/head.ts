export const scaffoldHead = ({
  title,
  description,
}: {
  title?: string,
  description?: string,
}) => {
  const titleFragment = title ? [
    { name: 'title', content: title },
    { property: 'og:title', content: title },
    { property: 'twitter:title', content: title },
  ] : [];
  const descriptionFragment = description ? [
    { name: 'description', content: description },
    { property: 'og:description', content: description },
    { property: 'twitter:description', content: description },
  ] : [];
  const meta = [...titleFragment, ...descriptionFragment];

  return {
    ...(title ? { title } : {}),
    meta,
  };
};
