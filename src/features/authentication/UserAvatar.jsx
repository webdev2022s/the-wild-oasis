import styled from "styled-components";
import defavatar from "../../assets/default-user.jpg";
import useGetUser from "./useGetUser";

const StyledAvatarBox = styled.div`
  display: flex;
  align-items: center;
  color: var(--color-grey-600);
  font-weight: 600;
  font-size: 1.4rem;
  gap: 1.2rem;

  & span {
    text-transform: uppercase;
  }
`;

const Avatar = styled.img`
  display: block;
  width: 4rem;
  height: 3.8rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-green-100);
`;

export default function UserAvatar() {
  const { currentUser } = useGetUser();
  const { avatar, fullName } = currentUser.user_metadata;

  return (
    <StyledAvatarBox>
      <Avatar src={avatar || defavatar} alt={`avatar ${fullName}`} />
      <span>{fullName}</span>
    </StyledAvatarBox>
  );
}
