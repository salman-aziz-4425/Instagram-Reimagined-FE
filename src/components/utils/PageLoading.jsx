export default function PageLoading() {
	return (
		<div className="max-w-xl mx-auto">
			<div className="p-4 bg-white border border-primary rounded-md">
				<div className="flex">
					<div className="mr-8 bg-gray-200 border border-gray-200 h-96 w-96 rounded animate-pulse"></div>
					<div className="space-y-2 flex flex-col w-full">
						<div className="flex w-full items-center">
							<div className="bg-gray-200 border border-gray-200 w-72 h-6 animate-pulse"></div>
							<div className="ml-6 bg-ternary w-16 h-6 animate-pulse"></div>
						</div>
						<div className="bg-gray-200 border border-gray-200 w-44 h-6 animate-pulse"></div>
						<div className="bg-gray-200 border border-gray-200 w-full h-64 animate-pulse"></div>
					</div>
				</div>

				<div className="mt-6 flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="bg-gray-200 border border-gray-200 w-20 h-6 animate-pulse"></div>
						<span className="bg-tertiary h-2 w-2 rounded animate-pulse"></span>
						<div className="bg-gray-200 border border-gray-200 w-20 h-6 animate-pulse"></div>
					</div>
					<div className="bg-gray-200 border border-gray-200 w-20 h-6 animate-pulse"></div>
				</div>
			</div>
		</div>
	)
}
