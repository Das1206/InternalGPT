
interface Props {
    label: string,
    type?: string,
    placeholder: string,
    value: string,
    onChange: (value: string) => void,
}
const Input = ({ type = 'text', placeholder, value, onChange, label }: Props) => {
    return (
        <>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                    {label}
                </label>
                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    name="name"
                    placeholder={placeholder}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />
            </div>
        </>
    )
}

export default Input