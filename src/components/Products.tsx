import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { GetProducts } from "../quries/queries";
import ProductCard from "./Card.tsx/CardProduct";

const SkeletonCard = () => (
  <div className="w-[301px] h-[812px] rounded-[15px] bg-[#cccccc] animate-pulse flex flex-col px-[10px] py-2">
    <div className="w-[281px] h-[366px] bg-[#e0e0e0] rounded-[15px]" />
    <div className="flex flex-col h-[312px] mt-4 space-y-2">
      <div className="w-full h-10 bg-[#e0e0e0] rounded" />
      <div className="w-full h-24 bg-[#e0e0e0] rounded" />
    </div>
    <div className="w-full h-10 bg-[#e0e0e0] mt-4 rounded" />
    <div className="w-full h-[68px] bg-[#e0e0e0] mt-2 rounded" />
  </div>
);

export default function Products() {
  const {
    data: ProductsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: ({ pageParam = 1 }) => GetProducts(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      const loadedItems = allPages.flatMap((p) => p.items).length;
      const totalItems = lastPage.total;

      if (loadedItems >= totalItems) return undefined;

      const nextPage = lastPage.page + 1;
      return nextPage;
    },
    initialPageParam: 1,
  });

  const loadMoreRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: "200px" }
    );

    const node = loadMoreRef.current;
    if (node) observer.observe(node);
    return () => {
      if (node) observer.unobserve(node);
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const allItems = ProductsData?.pages.flatMap((page) => page.items) ?? [];

  const total = ProductsData?.pages?.[0]?.total ?? 0;
  const remaining = total - allItems.length;
  const skeletonCount = isFetchingNextPage ? Math.min(remaining, 60) : 0;

  return (
    <div className="w-full max-w-screen flex flex-col justify-center">
      <div className="flex flex-wrap gap-y-10 gap-x-9 w-full max-w-screen justify-center">
        {allItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        <div ref={loadMoreRef} className="h-1 w-full" />
        {Array.from({ length: skeletonCount }).map((_, idx) => (
          <SkeletonCard key={`skeleton-${idx}`} />
        ))}
      </div>
    </div>
  );
}
