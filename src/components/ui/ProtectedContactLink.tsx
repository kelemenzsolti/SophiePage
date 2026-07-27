interface ProtectedContactLinkProps {
  type: 'email' | 'phone';
  label: string;
  actionLabel: string;
  className?: string;
  labelClassName?: string;
  previewClassName?: string;
  actionClassName?: string;
}

const emailParts = ['hello', 'czarthzsofia', 'hu'];
const phoneParts = ['+36', '30', '123', '4567'];

function getEmail() {
  return `${emailParts[0]}@${emailParts[1]}.${emailParts[2]}`;
}

function getPhoneHref() {
  return phoneParts.join('');
}

export function ProtectedContactLink({
  type,
  label,
  actionLabel,
  className = '',
  labelClassName = 'text-charcoal',
  previewClassName = 'text-charcoal/60',
  actionClassName = 'text-terracotta hover:text-charcoal',
}: ProtectedContactLinkProps) {
  const handleClick = () => {
    const href =
      type === 'email' ? `mailto:${getEmail()}` : `tel:${getPhoneHref()}`;

    window.location.href = href;
  };

  const preview =
    type === 'email'
      ? `${emailParts[0]} [@] ${emailParts[1]} [.] ${emailParts[2]}`
      : `${phoneParts[0]} ${phoneParts[1]} XXX XXXX`;

  return (
    <div className={className}>
      <p className={`font-medium ${labelClassName}`}>{label}</p>
      <p className={`mt-1 ${previewClassName}`}>{preview}</p>
      <button
        type="button"
        onClick={handleClick}
        className={`mt-2 text-left text-sm font-medium transition-colors ${actionClassName}`}
      >
        {actionLabel}
      </button>
    </div>
  );
}
