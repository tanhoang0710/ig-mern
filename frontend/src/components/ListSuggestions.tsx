import { listSuggestions } from "../common/data/listSuggestions";
import ButtonLink from "./ButtonLink";
import ItemRow from "./ItemRow";

export const ListSuggestion = (): JSX.Element => {
  return (
    <div>
      {listSuggestions?.map((e, index) => {
        return (
          <ItemRow
            key={index}
            url={e.user.avatar}
            title={e.user.userName}
            size={34}
            rightItem={<ButtonLink outline textBtn="Follow" onClick={() => console.log("")} />}
            subTitleItem={<p className="text-xs text-secondary-text text-ellipsis font-medium">{e.type}</p>}
          />
        );
      })}
    </div>
  );
};
