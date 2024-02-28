// import React, { Fragment, useRef } from "react";
// import { IoNotificationsCircleOutline, IoAlertCircleSharp } from "react-icons/io5";
// import { Menu, Transition } from "@headlessui/react";
// import { Typography } from "@mui/material";

// const Navbar = () => {
//   const buttonRef = useRef(null);
//   const timeoutDuration = 200;
//   let timeout;

//   const closePopover = () => {
//     return buttonRef.current?.dispatchEvent(
//       new KeyboardEvent("keydown", {
//         key: "Escape",
//         bubbles: true,
//         cancelable: true
//       })
//     );
//   };

//   const onMouseEnter = (open) => {
//     clearTimeout(timeout);
//     if (open) return;
//     return buttonRef.current?.click();
//   };

//   const onMouseLeave = (open) => {
//     if (!open) return;
//     timeout = setTimeout(() => closePopover(), timeoutDuration);
//   };

//   const solutions = [
//     {
//       name: "Insights",
//       description: "Measure actions your users take",
//       href: "##",
//       icon: IconOne
//     },
//     {
//       name: "Automations",
//       description: "Create your own targeted content",
//       href: "##",
//       icon: IconTwo
//     },
//     {
//       name: "Reports",
//       description: "Keep track of your growth",
//       href: "##",
//       icon: IconThree
//     }
//   ];

//   function classNames(...classes) {
//     return classes.filter(Boolean).join(" ");
//   }

//   return (
//     <div className="flex items-center justify-between p-4">
//       <div className="flex items-center">
//         <IoAlertCircleSharp className="text-lg text-green-500 align-items-start" />
//         <p className="ml-1 flex text-green-500 font-bold text-sm h-1">Active</p>
//       </div>

//       <Typography variant="h6" fontWeight="bold" color="black">
//         Wear Monitoring Device
//       </Typography>

//       <Menu as="div" className="relative inline-block">
//         <div>
//           <Menu.Button
//             ref={buttonRef}
//             className="inline-flex justify-center gap-x-1 rounded-full bg-white p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
//             onMouseEnter={() => onMouseEnter(false)}
//             onMouseLeave={() => onMouseLeave(false)}
//           >
//             <IoNotificationsCircleOutline className="text-xl" />
//           </Menu.Button>
//         </div>

//         <Transition
//           as={Fragment}
//           enter="transition ease-out duration-200"
//           enterFrom="opacity-0 translate-y-1"
//           enterTo="opacity-100 translate-y-0"
//           leave="transition ease-in duration-150"
//           leaveFrom="opacity-100 translate-y-0"
//           leaveTo="opacity-0 translate-y-1"
//         >
//           <Menu.Items className="absolute right-0 z-10 mt-1 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//             {/* Your popover menu content here */}
//             {solutions.map((item) => (
//               <Menu.Item key={item.name}>
//                 {({ active }) => (
//                   <a
//                     href={item.href}
//                     className={classNames(
//                       active ? "bg-gray-100" : "",
//                       "block px-4 py-2 text-sm text-gray-700"
//                     )}
//                     onMouseEnter={() => onMouseEnter(true)}
//                     onMouseLeave={() => onMouseLeave(true)}
//                   >
//                     <div className="flex items-center">
//                       <item.icon className="w-5 h-5 mr-2" aria-hidden="true" />
//                       <span>{item.name}</span>
//                     </div>
//                     <p className="text-xs text-gray-500">{item.description}</p>
//                   </a>
//                 )}
//               </Menu.Item>
//             ))}
//           </Menu.Items>
//         </Transition>
//       </Menu>
//     </div>
//   );
// };

// function IconOne() {
//   return (
//     <svg
//       width="48"
//       height="48"
//       viewBox="0 0 48 48"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <rect width="48" height="48" rx="8" fill="#FFEDD5" />
//       <path
//         d="M24 11L35.2583 17.5V30.5L24 37L12.7417 30.5V17.5L24 11Z"
//         stroke="#FB923C"
//         strokeWidth="2"
//       />
//       <path
//         fillRule="evenodd"
//         clipRule="evenodd"
//         d="M16.7417 19.8094V28.1906L24 32.3812L31.2584 28.1906V19.8094L24 15.6188L16.7417 19.8094Z"
//         stroke="#FDBA74"
//         strokeWidth="2"
//       />
//       <path
//         fillRule="evenodd"
//         clipRule="evenodd"
//         d="M20.7417 22.1196V25.882L24 27.7632L27.2584 25.882V22.1196L24 20.2384L20.7417 22.1196Z"
//         stroke="#FDBA74"
//         strokeWidth="2"
//       />
//     </svg>
//   )
// }

// function IconTwo() {
//   return (
//     <svg
//       width="48"
//       height="48"
//       viewBox="0 0 48 48"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <rect width="48" height="48" rx="8" fill="#FFEDD5" />
//       <path
//         d="M28.0413 20L23.9998 13L19.9585 20M32.0828 27.0001L36.1242 34H28.0415M19.9585 34H11.8755L15.9171 27"
//         stroke="#FB923C"
//         strokeWidth="2"
//       />
//       <path
//         fillRule="evenodd"
//         clipRule="evenodd"
//         d="M18.804 30H29.1963L24.0001 21L18.804 30Z"
//         stroke="#FDBA74"
//         strokeWidth="2"
//       />
//     </svg>
//   )
// }

// function IconThree() {
//   return (
//     <svg
//       width="48"
//       height="48"
//       viewBox="0 0 48 48"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <rect width="48" height="48" rx="8" fill="#FFEDD5" />
//       <rect x="13" y="32" width="2" height="4" fill="#FDBA74" />
//       <rect x="17" y="28" width="2" height="8" fill="#FDBA74" />
//       <rect x="21" y="24" width="2" height="12" fill="#FDBA74" />
//       <rect x="25" y="20" width="2" height="16" fill="#FDBA74" />
//       <rect x="29" y="16" width="2" height="20" fill="#FB923C" />
//       <rect x="33" y="12" width="2" height="24" fill="#FB923C" />
//     </svg>
//   )
// }

// export default Navbar;

import React from 'react'
import Popover from '../components/popover'
const Test = () => {
  return (
    <Popover/>
  )
}

export default Test