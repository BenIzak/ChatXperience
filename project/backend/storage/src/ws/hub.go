package ws

type Room struct {
	ID      string             `json:"id"`
	Name    string             `json:"name"`
	Clients map[string]*Client `json:"client"`
}

type Hub struct {
	Room map[string]*Room
}

func NewHub() *Hub {
	return &Hub{
		Room: make(map[string]*Room),
	}
}
