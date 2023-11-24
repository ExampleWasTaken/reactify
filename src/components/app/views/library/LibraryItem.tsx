interface LibraryItemProps {
  cover: string;
  title: string;
  type: string;
  author?: string;
}

export const LibraryItem = ({
  cover,
  title,
  type,
  author,
}: LibraryItemProps) => {
  return (
    <section className="px-5 h-16 flex items-center space-x-3">
      <img
        src={cover}
        className="h-full aspect-square"
      />
      <div className="flex flex-col justify-center">
        <p className="text-lg">{title}</p>
        <div className="text-[#aaa]">{`${type} - ${author}`}</div>
      </div>
    </section>
  );
};
