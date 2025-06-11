import { useQuery } from "@tanstack/react-query";
import { GetReviews } from "../quries/queries";
import parse, { domToReact } from "html-react-parser";
import type { DOMNode, HTMLReactParserOptions } from "html-react-parser";
import DOMPurify from "dompurify";

export default function Reviews() {
  const {
    data: Reviews,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["getReviews"],
    queryFn: () => GetReviews(),
    retry: 1, // Количество попыток повтора запроса при ошибке
  });

  const parseReviewText = (html: string) => {
    if (!html) return null;
    const cleanHtml = DOMPurify.sanitize(html);
    const options: HTMLReactParserOptions = {
      replace: (domNode: DOMNode) => {
        if (domNode.type === "tag" && domNode.name) {
          if (domNode.name === "h1") {
            return (
              <p className="xl:text-[36px] lg:text-[36px] text-[24px] text-[#000000] leading-[100%] line-clamp-2">
                {domToReact(domNode.children as DOMNode[], options)}
              </p>
            );
          }
          if (domNode.name === "p") {
            return (
              <p className="text-[#000000] leading-[100%] xl:text-[24px] lg:text-[24px] text-[12px] line-clamp-14 mt-4">
                {domToReact(domNode.children as DOMNode[], options)}
              </p>
            );
          }
        }
        return undefined;
      },
    };
    return parse(cleanHtml, options);
  };

  // Скелетон для карточки отзыва
  const ReviewSkeleton = ({ isError = false }: { isError?: boolean }) => (
    <div
      className={`flex-shrink-0 xl:w-[611px] xl:h-[468px] lg:w-[611px] lg:h-[468px] w-[280px] h-[220px] rounded-[15px] bg-[#D9D9D9] py-5 px-[26px] box-border flex flex-col ${
        isError ? "border-2 border-red-500 animate-pulse" : ""
      }`}
    >
      <div className="flex-grow overflow-hidden space-y-3">
        <div
          className={`h-7 w-3/4 rounded ${
            isError ? "bg-red-200" : "bg-gray-300"
          }`}
        ></div>
        <div
          className={`h-4 w-full rounded ${
            isError ? "bg-red-200" : "bg-gray-300"
          }`}
        ></div>
        <div
          className={`h-4 w-5/6 rounded ${
            isError ? "bg-red-200" : "bg-gray-300"
          }`}
        ></div>
        <div
          className={`h-4 w-2/3 rounded ${
            isError ? "bg-red-200" : "bg-gray-300"
          }`}
        ></div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="max-w-screen w-full xl:px-20 lg:px-10 px-4 overflow-x-hidden">
        <div className="flex w-full overflow-x-scroll pb-4 scrollbar-hide">
          <div className="flex gap-8 min-w-max">
            {[...Array(3)].map((_, i) => (
              <ReviewSkeleton key={`skeleton-${i}`} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-screen w-full xl:px-20 lg:px-10 px-4 overflow-x-hidden">
        <div className="flex w-full overflow-x-scroll pb-4 scrollbar-hide">
          <div className="flex gap-8 min-w-max">
            {[...Array(3)].map((_, i) => (
              <ReviewSkeleton key={`error-skeleton-${i}`} isError />
            ))}
          </div>
        </div>
        <div className="text-center mt-4 text-red-500">
          Не удалось загрузить отзывы. Пожалуйста, попробуйте позже.
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-screen w-full xl:px-20 lg:px-10 px-4 overflow-x-hidden">
      <div className="flex w-full overflow-x-scroll pb-4 scrollbar-hide">
        <div className="flex gap-8 min-w-max">
          {Reviews?.map((review) => (
            <div
              key={review.id}
              className="flex-shrink-0 xl:w-[611px] xl:h-[468px] lg:w-[611px] lg:h-[468px] w-[280px] h-[220px] rounded-[15px] bg-[#D9D9D9] py-5 px-[26px] box-border flex flex-col"
            >
              <div className="flex-grow overflow-hidden">
                {parseReviewText(review.text)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
