export const Badge = ({ children, color = "purple" }) => {
  const colors = {
    purple: "bg-[#EEEDFE] text-[#5044E5]",
    green: "bg-[#E1F5EE] text-[#0F6E56]",
    red: "bg-[#FCEBEB] text-[#A32D2D]",
    yellow: "bg-[#FAEEDA] text-[#854F0B]",
  };
  return (
    <span
      className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${colors[color]}`}
    >
      {children}
    </span>
  );
};

export const SectionTitle = ({ id, children }) => (
  <h2
    id={id}
    className="text-[22px] font-semibold text-[#3B3B3B] mt-12 mb-4 scroll-mt-24 border-b border-[#EFEFEF] pb-3"
  >
    {children}
  </h2>
);

export const SubTitle = ({ id, children }) => (
  <h3
    id={id}
    className="text-[17px] font-semibold text-[#3B3B3B] mt-8 mb-3 scroll-mt-24"
  >
    {children}
  </h3>
);

export const Param = ({ name, type, required, desc }) => (
  <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 py-3 border-b border-[#F0F0F0] last:border-0">
    <div className="flex items-center gap-2 shrink-0 min-w-45">
      <code className="text-[13px] font-mono text-[#5044E5] bg-[#EEEDFE] px-2 py-0.5 rounded">
        {name}
      </code>
      <span className="text-[11px] text-[#AEAEAE]">{type}</span>
      {required && <Badge color="red">required</Badge>}
    </div>
    <p className="text-[13px] text-[#727272] leading-relaxed">{desc}</p>
  </div>
);
