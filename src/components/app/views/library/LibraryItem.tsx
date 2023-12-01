interface LibraryItemProps {
  cover: string;
  title: string;
  type: string;
  author?: string;
}

export const LibraryItem = ({ cover, title, type, author }: LibraryItemProps) => {
  return (
    <section className="px-5 h-16 flex items-center space-x-3">
      <img
        src={cover}
        className="h-full aspect-square"
        alt="Library item cover"
      />
      <div className="flex flex-col justify-center overflow-hidden">
        <p className="w-full truncate max-w-full">{title}</p>
        <div className="text-xs text-subdued font-medium">
          {type} &bull; {author}
        </div>
      </div>
    </section>
  );
};
