import { clsx } from 'clsx';

interface LibraryItemProps {
  cover: string;
  name: string;
  type: string;
  owner?: string;
}

export const LibraryItem = ({ cover, name, type, owner }: LibraryItemProps) => {
  return (
    <section className="px-5 h-16 flex items-center space-x-3 transition-transform active:scale-[.99]">
      <img
        src={cover}
        className={clsx('h-full aspect-square', type.toLowerCase() === 'artist' ? ' rounded-full' : '')}
        alt="Library item cover"
      />
      <div className="flex flex-col justify-center overflow-hidden">
        <p className="w-full truncate max-w-full">{name}</p>
        <div className="text-xs text-subdued font-medium">
          <p>
            {type}
            {owner && <> &bull; </>}
            {owner}
          </p>
        </div>
      </div>
    </section>
  );
};
