interface LibraryItemProps {
  cover: string;
  title: string;
  type: string;
  author?: string;
}

export const LibraryItem = ({ cover, title, type, author }: LibraryItemProps) => {
  return (
    <section className="px-5 h-20 flex items-center space-x-3">
      <img
        src={cover}
        className="h-full aspect-square"
      />
      <div className="flex flex-col justify-center overflow-hidden">
        <p className="text-lg w-full truncate max-w-full border border-amber-500">{title}</p>
        <div className="text-[#aaa]">{`${type} - ${author}`}</div>
      </div>
    </section>
  );
};
