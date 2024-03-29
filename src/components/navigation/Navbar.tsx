import { Disclosure, Menu, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import React, { Fragment, useState } from 'react';

type Props = {
	openSidebar: () => void;
};

type NavigationTypes = {
	name: string;
	href: string;
	current: boolean;
}[];

const navigation: NavigationTypes = [
	{ name: 'Home', href: '/', current: true },
	{ name: 'Explore', href: '/explore', current: false },
	{ name: 'Categories', href: '/categories', current: false },
	{ name: 'Search', href: '/search', current: false },
	{ name: 'Blog', href: '/blog', current: false },
];

const classNames = (classes: [string, string]) => classes.filter(Boolean).join(' ');

const Navbar = ({ openSidebar }: Props) => {
	const { data: session, status } = useSession();
	const [error, setError] = useState<string>('');

	const handleSignOut = async () => {
		try {
			await signOut();
		} catch (err) {
			setError('Something went wrong.');
		}
	};

	return (
		<Disclosure as="nav" className="bg-[#E5F4EC]">
			{({ open }) => (
				<>
					<div className="container mx-auto px-4">
						<div className="relative flex h-16 items-center justify-between">
							<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
								<Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
									<span className="sr-only">Open main menu</span>
									{open ? (
										<XIcon className="block h-6 w-6" aria-hidden="true" />
									) : (
										<MenuIcon className="block h-6 w-6" aria-hidden="true" />
									)}
								</Disclosure.Button>
							</div>
							<div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
								<div className="flex shrink-0 items-center">
									<Link href="/">
										<a className="mr-12 flex-none text-xl font-extrabold transition-colors hover:text-red-400">
											Recipebook
										</a>
									</Link>
								</div>
								<div className="hidden sm:ml-6 sm:block">
									<div className="flex space-x-4">
										{navigation.map((item) => (
											<a
												key={item.name}
												href={item.href}
												className={classNames([
													item.current
														? 'bg-gray-900 text-white'
														: 'text-black hover:bg-gray-700 hover:text-white',
													'px-3 py-2 rounded-md text-sm font-medium',
												])}
												aria-current={item.current ? 'page' : undefined}
											>
												{item.name}
											</a>
										))}
									</div>
								</div>
							</div>
							{status === 'authenticated' && (
								<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
									<Menu as="div" className="relative ml-3">
										<div>
											<Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none">
												<span className="sr-only">Open user menu</span>
												<img
													id="avatar"
													className="h-10 w-10 cursor-pointer rounded-full"
													src={session.user.image}
													alt="user image"
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
											<Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 focus:outline-none">
												<Menu.Item>
													{({ active }) => (
														<a
															href="#"
															className={classNames([
																active ? 'bg-gray-100' : '',
																'block px-4 py-2 text-sm text-gray-700',
															])}
														>
															Your Profile
														</a>
													)}
												</Menu.Item>
												<Menu.Item>
													{({ active }) => (
														<a
															href="#"
															className={classNames([
																active ? 'bg-gray-100' : '',
																'block px-4 py-2 text-sm text-gray-700',
															])}
														>
															Settings
														</a>
													)}
												</Menu.Item>
												<Menu.Item>
													{({ active }) => (
														<a
															onClick={handleSignOut}
															type="button"
															className={classNames([
																active ? 'bg-gray-100' : '',
																'block px-4 py-2 text-sm text-gray-700 cursor-pointer',
															])}
														>
															{error === '' ? 'Sign out' : error}
														</a>
													)}
												</Menu.Item>
											</Menu.Items>
										</Transition>
									</Menu>
								</div>
							)}
							{status === 'unauthenticated' && (
								<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
									<Menu as="div" className="relative ml-3">
										<div>
											<Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
												<span className="sr-only">Open user menu</span>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="h-10 w-10 rounded-full p-2 text-white"
													viewBox="0 0 20 20"
													fill="currentColor"
												>
													<path
														fillRule="evenodd"
														d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
														clipRule="evenodd"
													/>
												</svg>
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
											<Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 focus:outline-none">
												<Menu.Item>
													{({ active }) => (
														<button
															onClick={openSidebar}
															className={classNames([
																active ? 'bg-gray-100' : '',
																'block px-4 py-2 text-sm w-full text-start text-gray-700',
															])}
														>
															Sign in
														</button>
													)}
												</Menu.Item>
												<Menu.Item>
													{({ active }) => (
														<Link href="/register">
															<a
																className={classNames([
																	active ? 'bg-gray-100' : '',
																	'block px-4 py-2 text-sm text-gray-700',
																])}
															>
																Register
															</a>
														</Link>
													)}
												</Menu.Item>
											</Menu.Items>
										</Transition>
									</Menu>
								</div>
							)}
						</div>
					</div>
					<Disclosure.Panel className="sm:hidden">
						<div className="space-y-1 px-2 pt-2 pb-3">
							{navigation.map((item) => (
								<Disclosure.Button
									key={item.name}
									as="a"
									href={item.href}
									className={classNames([
										item.current
											? 'bg-gray-900 text-white'
											: 'text-black hover:bg-gray-700 hover:text-white',
										'block px-3 py-2 rounded-md text-base font-medium',
									])}
									aria-current={item.current ? 'page' : undefined}
								>
									{item.name}
								</Disclosure.Button>
							))}
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
};

export default Navbar;
