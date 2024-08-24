import React from 'react'
import { BarChart, Wallet, Newspaper, BellRing, Paperclip, Brush, Wrench } from 'lucide-react'
import Logo from './Logo'
import { Link } from 'react-router-dom'


export function SideBar({ className = '' }) {
  return (
    <aside className={`${className} border mb-5 flex w-64 flex-col overflow-y-auto bg-white px-5 py-8`}>

      <Logo width='30%' />

      <div className="mt-6 flex flex-1 flex-col justify-between">
        <nav className="-mx-3 space-y-6 ">
          <div className="space-y-3 ">
            <label className="px-3 text-xs font-semibold uppercase text-black">Database</label>
            <Link to='/database/products'>
              <button
                className="flex w-full transform items-center rounded-lg px-3 py-2 text-black transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              // href="/manage-products/products"
              >
                <BarChart className="h-5 w-5" aria-hidden="true" />
                <span className="mx-2 text-sm font-medium">Products</span>
              </button>
            </Link>
            <Link to='/database/coupons'>
            <button
              className="flex w-full transform items-center rounded-lg px-3 py-2 text-blacktransition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
         
            >
              <Wallet className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Coupons</span>
            </button>
            </Link>
          </div>
          <div className="space-y-3 ">
            <label className="px-3 text-xs font-semibold uppercase text-black">content</label>
            <button
              className="flex w-full transform items-center rounded-lg px-3 py-2 text-black transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              href="#"
            >
              <Newspaper className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Blogs</span>
            </button>
            <button
              className="flex w-full transform items-center rounded-lg px-3 py-2 text-black transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              href="#"
            >
              <BellRing className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Notifications</span>
            </button>
            <button
              className="flex w-full transform items-center rounded-lg px-3 py-2 text-black transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              href="#"
            >
              <Paperclip className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Checklists</span>
            </button>
          </div>

          <div className="space-y-3 ">
            <label className="px-3 text-xs font-semibold uppercase text-black">Customization</label>
            <button
              className="flex w-full transform items-center rounded-lg px-3 py-2 text-black transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              href="#"
            >
              <Brush className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Themes</span>
            </button>
            <button
              className="flex w-full transform items-center rounded-lg px-3 py-2 text-black transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              href="#"
            >
              <Wrench className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Setting</span>
            </button>
          </div>
        </nav>

      </div>
      <div>

      </div>
    </aside>
  )
}

export default SideBar