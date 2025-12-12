import { Button, Container } from "@mui/material";
import useUsersList from "../../hooks/User/useUsersList";
import UsersTable from "../../components/common/Tables/UsersTable";
import { useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import CreateUserModal from "../../components/modal/CreateUserModal";
import { IUserPost } from "../../hooks/User/useUserUpdate";
export default function Users() {
  const { data, isPending } = useUsersList();
  const [user, setUser] = useState<IUserPost | undefined>();
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-x-auto">
      <Container sx={{ mt: "2rem" }}>
        <div className="flex justify-between items-center flex-wrap mb-4">
          <Button
            onClick={() => setOpen(true)}
            sx={{
              textTransform: "none",
              borderRadius: "0.5rem",
              padding: "0.6rem 1rem",
              fontSize: "0.9rem",
            }}
            startIcon={<IoMdAddCircle className="text-xl" />}
            variant="contained"
          >
            Create New User
          </Button>
        </div>
        <UsersTable
          data={data?.list || []}
          setUser={(user: IUserPost) => {
            setUser(user);
            setOpen(true);
          }}
          isDataLoading={isPending}
        />
      </Container>
      <CreateUserModal
        open={open}
        handleClose={() => setOpen(false)}
        user={user}
      />
    </div>
  );
}
