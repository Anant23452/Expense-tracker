

type SummaryCardProps={
    title:string;
    value:string | number;
}

function SummaryCard({title,value}:SummaryCardProps){
    return (
        <>
        <div className="bg-gray-600  p-4  rounded-lg shadow">
            <h2 className="text-black">{title}</h2>
            <h2 className="text-gray-900">{value}</h2>
        </div>
        </>
    )
}
export default SummaryCard