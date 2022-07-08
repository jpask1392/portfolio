import Icon from "@/components/ui/Icon"

export const renderOptions = {
  blokResolvers: {
    ['icon']: (props) => {
      return <Icon {...props} />
    }
  }
}
