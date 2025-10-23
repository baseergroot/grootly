

const InputWrapper = ({ children }) => {
    return (
        <div className="w-full flex items-center gap-3 bg-[#1E293B] px-3 py-2  rounded-md focus:outline-none focus:ring focus:ring-blue-200 border border-white/20">
            {children}
        </div>
    )
}

export default InputWrapper