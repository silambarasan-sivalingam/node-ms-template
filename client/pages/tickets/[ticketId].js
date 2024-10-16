const TicketShow = ({ ticket }) => {
  return (
    <div>
      <h1>{ticket.title}</h1>
      <h4>Price: {ticket.price}</h4>
    </div>
  );
};

TicketShow.getInitialProps = async (context, client, data) => {
  const { id } = context.query;
  const { data: ticket } = await client.get(`/api/tickets/${id}`);

  return { ticket };
};

export default TicketShow;