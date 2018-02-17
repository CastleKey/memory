defmodule MemoryWeb.RoomChannel do
  #use Phoenix.Channel
  use MemoryWeb, :channel

  alias Memory.Game


  def join("games:" <> name, payload, socket) do
    if authorized?(payload) do
      game = Game.new()
      socket = socket
      |> assign(:game, game)
      |> assign(:name, name)
      {:ok, %{"join" => name, "game" => Game.client_view(game)}, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  def handle_in("guess", %{"number1" => ll}, socket) do
    IO.puts "This is the socket"
    IO.puts ll
    game = Game.guess(socket.assigns[:game], ll)
    socket = assign(socket, :game, game)
    IO.puts "This is the game in handle_in"
    # IO.puts game
    {:reply, {:ok, %{ "game" => Game.client_view(game)}}, socket}
  end

  def handle_in("reset", %{}, socket) do
    IO.puts "This is the socket"
    game = Game.reset(socket.assigns[:game])
    socket = assign(socket, :game, game)
    IO.puts "This is the reset in handle_in"
    {:reply, {:ok, %{ "game" => Game.client_view(game)}}, socket}
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end

end
