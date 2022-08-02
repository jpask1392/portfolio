import Header from '@/components/ui/Header';
import ProjectTile from '@/components/modules/ProjectTile';
import type { Project } from '@/types/project';


interface Props {
  projects: Project[]
}

const FeaturedProjects: React.FC<Props> = ({
  projects
}) => {
  // console.log(projects)
  return (
    <div className="flex relative">
      <div className="border border-black rounded-full relative w-16 flex-shrink-0 mr-5">
        <Header className="!absolute transform rotate-90 origin-top-left whitespace-nowrap">
          Featured Projects
        </Header>
      </div>
      <ul className="flex space-x-5 flex-1">
        {
          projects.map((project) => {
            return (
              <li className="flex-shrink-0 w-[328px]">
                <ProjectTile project={project} />
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default FeaturedProjects;
