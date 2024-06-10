
const EmptyCard = ({ImgSrc}) => {
  return (
      <div className="flex flex-col justify-center items-center mt-24">
          <img src={ImgSrc} className="w-1/3" alt="addnote" />
          <p className="font-semibold text-xl">{"Click the "+" icon to add your notes"}</p>
          
    </div>
  )
}

export default EmptyCard