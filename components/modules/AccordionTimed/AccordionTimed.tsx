import Header from '@/components/ui/Header';

interface Props {
  
}

const AccordionTimed: React.FC<Props> = ({
  
}) => {
  
  return (
    <div>
      <div className="flex flex-wrap -mx-20">
        <div className="w-1/2 px-20">
          <Header>
            Commonly asked questions about the process -
          </Header>
        </div>
      </div>

      <div className="flex flex-wrap -mx-20 mt-20">
        <div className="w-1/2 px-20">
          <ul>
            <li className="pb-5 border-b border-black mb-6">
              <Header size="h4">
                Q1. How much does a website cost?
              </Header>
            </li>
            <li className="pb-5 border-b border-black mb-6 opacity-20">
              <Header size="h4">
                Q2. How long does development take?
              </Header>
            </li>
            <li className="pb-5 border-b border-black opacity-20">
              <Header size="h4">
                Q3. How much does a website cost?
              </Header>
            </li>
          </ul>
        </div>
        <div className="w-1/2 px-20">
          <div className="h-full w-full max-w-[430px]">
            <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eu luctus quam, eget convallis tellus. Aenean porta quis est eu vehicula. Nullam aliquet ligula diam, eget cursus purus accumsan quis. Praesent vitae tristique diam, vel molestie nulla. Curabitur ullamcorper sodales lacus ut.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eu luctus quam, eget convallis tellus. Aenean porta quis est eu vehicula. Nullam aliquet ligula diam, eget cursus purus accumsan quis. Praesent vitae tristique diam, vel molestie nulla. Curabitur ullamcorper sodales lacus ut.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccordionTimed;
