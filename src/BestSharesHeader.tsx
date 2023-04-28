import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";

export type OrderByValue =
  | "createdAt ASC"
  | "createdAt DESC"
  | "likes ASC"
  | "likes DESC"
  | "comments ASC"
  | "comments DESC";

export type OrderByOptions = {
  name: string;
  value: OrderByValue;
};

const orderByOptions: OrderByOptions[] = [
  {
    name: "Date created (Latest first)",
    value: "createdAt DESC",
  },
  {
    name: "Date created (Earliest first)",
    value: "createdAt ASC",
  },
  { name: "Most liked", value: "likes DESC" },
  { name: "Less liked", value: "likes ASC" },
  { name: "Most commented", value: "comments DESC" },
  { name: "Less commented", value: "comments ASC" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface BestSharesHeaderProps {
  handleOrderBy: (value: OrderByValue) => void;
  filters: {
    offset: number;
    limit: number;
    orderBy: string;
    order: string;
  };
}

export default function BestSharesHeader({
  handleOrderBy,
  filters,
}: BestSharesHeaderProps) {
  return (
    <div className="flex items-baseline justify-between border-b border-gray-200 pb-4 pt-6 px-10">
      <h1 className="font-aldrich text-3xl font-bold tracking-tight">
        Code With The Best
      </h1>
      <div className="flex items-center">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="group inline-flex justify-center text-m font-medium text-white hover:text-gray-900">
              Order by
              <ChevronDownIcon
                className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                {orderByOptions.map((option: OrderByOptions) => (
                  <Menu.Item key={option.name}>
                    {({ active }) => (
                      <button
                        type="button"
                        onClick={() => handleOrderBy(option.value)}
                        className={classNames(
                          option.value === `${filters.orderBy} ${filters.order}`
                            ? "font-medium text-gray-900"
                            : "text-gray-500",
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm w-full text-left",
                        )}
                      >
                        {option.name}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
}
