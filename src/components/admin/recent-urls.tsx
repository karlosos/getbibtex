import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";

export function RecentUrls() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/01.png" alt="Avatar" />
          <AvatarFallback>OM</AvatarFallback>
        </Avatar>
        <div className="ml-4 min-w-0 space-y-1">
          <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-medium leading-none">
            <a
              className=""
              href="https://www.matweb.com/search/datasheet_print.aspx?matguid=39e40851fc164b6c9bda29d798bf3726"
            >
              https://www.matweb.com/search/datasheet_print.aspx?matguid=39e40851fc164b6c9bda29d798bf3726
            </a>
          </p>
          <p className="text-sm text-muted-foreground">28.08.2023 10:34</p>
        </div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/01.png" alt="Avatar" />
          <AvatarFallback>FM</AvatarFallback>
        </Avatar>
        <div className="ml-4 min-w-0 space-y-1">
          <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-medium leading-none">
            <a
              className=""
              href="https://hbr.org/2019/07/the-elusive-green-consumer"
            >
              https://hbr.org/2019/07/the-elusive-green-consumer
            </a>
          </p>
          <p className="text-sm text-muted-foreground">28.08.2023 08:12</p>
        </div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/01.png" alt="Avatar" />
          <AvatarFallback>JM</AvatarFallback>
        </Avatar>
        <div className="ml-4 min-w-0 space-y-1">
          <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-medium leading-none">
            <a
              className=""
              href="https://www.digikey.com/es/blog/the-smith-chart-its-history-and-why-its-so-important"
            >
              https://www.digikey.com/es/blog/the-smith-chart-its-history-and-why-its-so-important
            </a>
          </p>
          <p className="text-sm text-muted-foreground">28.08.2023 07:01</p>
        </div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/01.png" alt="Avatar" />
          <AvatarFallback>JM</AvatarFallback>
        </Avatar>
        <div className="ml-4 min-w-0 space-y-1">
          <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-medium leading-none">
            <a className="" href="http://www.alkaline- ml.com/pmdarima ">
              http://www.alkaline- ml.com/pmdarima
            </a>
          </p>
          <p className="text-sm text-muted-foreground">28.08.2023 07:00</p>
        </div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/01.png" alt="Avatar" />
          <AvatarFallback>SD</AvatarFallback>
        </Avatar>
        <div className="ml-4 min-w-0 space-y-1">
          <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-medium leading-none">
            <a
              className=""
              href="https://www.researchgate.net/publication/332303449_Study_of_Inflation_in_Pakistan_Using_Time_Series_ARMA_ARFIMA_and_GARCH_Models"
            >
              https://www.researchgate.net/publication/332303449_Study_of_Inflation_in_Pakistan_Using_Time_Series_ARMA_ARFIMA_and_GARCH_Models
            </a>
          </p>
          <p className="text-sm text-muted-foreground">25.08.2023 16:55</p>
        </div>
      </div>
    </div>
  );
}
