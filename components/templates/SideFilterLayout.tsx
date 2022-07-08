import Container from "../ui/Container";

interface Props {
  Filters: any
  Content?: any
}

const SideFilterLayout: React.FC<Props> = ({ 
  Filters,
  Content,
}) => {
  return (
    <div className="relative">
      <aside className="hidden xl:block xl:w-[18rem] 2xl:w-[15%] bg-primary absolute inset-y-0 left-0 px-10 py-16 z-10 top-0">
        <div className="h-full overflow-auto">
          {/* Filter component from props */}
          <Filters />
        </div>
      </aside>

      <Container 
        clearMargin={['top', 'bottom']} 
        maxWidth="2xl" 
      >
        <div 
          className="xl:ml-[18rem] 2xl:max-w-[calc(100% - 16rem)] 2xl:ml-[15%] 2xl:max-w-[calc(100% - 15%)] transition-opacity py-14 xl:py-24"
        >
          {/* Content component from props */}
          <Content />
        </div>
      </Container>
    </div>
  )
};

export default SideFilterLayout;
