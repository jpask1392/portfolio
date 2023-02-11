import ProjectTile from "./ProjectTile";
import type { SbBlokData } from "@storyblok/react";
import type { storyBlokLink, storyBlokImage } from "@/types/storyBlok";

interface Props {
  projects: {
    content: {
      name: string
      siteLink: storyBlokLink
      images: storyBlokImage[]
    }
  }[]
}

interface Blok extends SbBlokData, Props {}

interface ProjectsProps extends Props {
  children?: any
  blok?: Blok
}

const ProjectsList: React.FC<ProjectsProps> = (props) => {
  const {
    projects
  } = props.blok || props;

  return (
    <div>
      <header className="border-y border-white">
        <div className="flex -mx-10 py-0.5">
          <div className="w-5/12 px-10"><h3 className="h3">Project</h3></div>
          <div className="w-7/12 px-10"><h3 className="h3">Highlights</h3></div>
        </div>
      </header>
      <ul className="">
        {
          projects.map(({ content }) => {
            return (
              <li className="py-3 border-b">
                <ProjectTile {...content} />
              </li>
            )
          })
        }
        
      </ul>
    </div>
  )
}

export default ProjectsList